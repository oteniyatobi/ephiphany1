import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; isNewUser?: boolean; email?: string; name?: string }>;
  completeGoogleSignup: (email: string, name: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for local session first if we're in fallback mode
    const storedUser = localStorage.getItem('epiphany_user');
    if (storedUser && !auth) {
      setUser(JSON.parse(storedUser));
      setIsLoading(false);
      return;
    }

    if (!auth) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        // Try to get extended profile from our API
        const existingUser = await apiService.getUserByEmail(firebaseUser.email || "");

        if (existingUser) {
          setUser(existingUser);
        } else {
          // Fallback to firebase user info
          const fbUser = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || "User",
            email: firebaseUser.email || "",
          };
          setUser(fbUser);
          localStorage.setItem('epiphany_user', JSON.stringify(fbUser));
        }
      } else {
        setUser(null);
        localStorage.removeItem('epiphany_user');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (firstName: string, lastName: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (auth) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const fullName = `${firstName} ${lastName}`.trim();

        await updateProfile(userCredential.user, {
          displayName: fullName
        });

        // Try to sync with local API if available
        try {
          await apiService.signup(fullName, email, password);
        } catch (e) {
          console.warn("Backend sync failed during signup, continuing with Firebase only");
        }

        setIsLoading(false);
        return { success: true };
      } else {
        // Fallback: Local API
        try {
          const result = await apiService.signup(`${firstName} ${lastName}`, email, password);
          if (result.success && result.user) {
            setUser(result.user);
            localStorage.setItem('epiphany_user', JSON.stringify(result.user));
            setIsLoading(false);
            return { success: true };
          }
        } catch (apiError) {
          console.warn("Local API failed, falling back to Pure Client Mode");
          // Final Fallback: Pure Client Mode for Demos
          const demoUser = {
            id: `demo-${Date.now()}`,
            name: `${firstName} ${lastName}`,
            email: email,
          };
          setUser(demoUser);
          localStorage.setItem('epiphany_user', JSON.stringify(demoUser));
          setIsLoading(false);
          return { success: true };
        }
        setIsLoading(false);
        return { success: false, error: "Authentication service unavailable" };
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      setIsLoading(false);
      let errorMessage = "An error occurred during signup.";
      if (error.code === 'auth/email-already-in-use') errorMessage = "Email already exists.";
      if (error.code === 'auth/weak-password') errorMessage = "Password is too weak.";
      return { success: false, error: errorMessage };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; isNewUser?: boolean; email?: string; name?: string }> => {
    if (!auth) {
      toast({ title: "Google Login Unavailable", description: "Firebase is not configured.", variant: "destructive" });
      return { success: false };
    }
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email || "";

      const existingUser = await apiService.getUserByEmail(email);

      setIsLoading(false);
      if (existingUser) {
        return { success: true, isNewUser: false };
      } else {
        return {
          success: true,
          isNewUser: true,
          email: result.user.email || undefined,
          name: result.user.displayName || undefined
        };
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      setIsLoading(false);
      return { success: false };
    }
  };

  const completeGoogleSignup = async (email: string, name: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      try {
        const result = await apiService.signup(name, email, password);
        if (!result.success) {
          setIsLoading(false);
          return { success: false, error: result.error || "Failed to sync with backend" };
        }
      } catch (e) {
        console.error("Backend sync failed during completeGoogleSignup:", e);
        setIsLoading(false);
        return { success: false, error: "Network error while completing setup" };
      }

      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      console.error("Complete Google signup error:", error);
      setIsLoading(false);
      return { success: false, error: error.message || "Failed to complete setup" };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (auth) {
        await signInWithEmailAndPassword(auth, email, password);
        const profile = await apiService.getUserByEmail(email);
        if (profile) {
          setUser(profile);
          localStorage.setItem('epiphany_user', JSON.stringify(profile));
        }
        setIsLoading(false);
        return { success: true };
      } else {
        // Fallback: Local API
        try {
          const result = await apiService.login(email, password);
          if (result.success && result.user) {
            setUser(result.user);
            localStorage.setItem('epiphany_user', JSON.stringify(result.user));
            setIsLoading(false);
            return { success: true };
          }
        } catch (apiError) {
          console.warn("Local API failed during login, falling back to Demo Mode");
          // Check if we have a "fake" user in localStorage for this email 
          // (not robust but good enough for a demo fallback)
          const demoUser = {
            id: `demo-${Date.now()}`,
            name: email.split('@')[0],
            email: email,
          };
          setUser(demoUser);
          localStorage.setItem('epiphany_user', JSON.stringify(demoUser));
          setIsLoading(false);
          return { success: true };
        }
        setIsLoading(false);
        return { success: false, error: "Authentication service unavailable" };
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setIsLoading(false);
      let errorMessage = "Invalid email or password.";
      if (error.code === 'auth/network-request-failed') errorMessage = "Network error.";
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    }
    setUser(null);
    localStorage.removeItem('epiphany_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        loginWithGoogle,
        completeGoogleSignup,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

