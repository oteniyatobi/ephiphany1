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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        // Try to get extended profile from our API
        const existingUser = await apiService.getUserByEmail(firebaseUser.email || "");

        if (existingUser) {
          setUser(existingUser);
        } else {
          // Fallback to firebase user info
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || "User",
            email: firebaseUser.email || "",
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (firstName: string, lastName: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
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
    } catch (error) {
      console.error("Google login error:", error);
      setIsLoading(false);
      return { success: false };
    }
  };

  const completeGoogleSignup = async (email: string, name: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // In Firebase, we can't easily add a password to a social login account after the fact 
      // without linking or special flows. For simplicity, we just sync with the API.
      // If we're already signed in with Google, the Firebase user exists.

      try {
        await apiService.signup(name, email, password);
      } catch (e) {
        console.warn("Backend sync failed during completeGoogleSignup");
      }

      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Complete Google signup error:", error);
      setIsLoading(false);
      return { success: false, error: "Failed to complete setup" };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Try to sync/fetch extended profile
      const profile = await apiService.getUserByEmail(email);
      if (profile) setUser(profile);

      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      console.error("Login error:", error);
      setIsLoading(false);
      let errorMessage = "Invalid email or password.";
      if (error.code === 'auth/network-request-failed') errorMessage = "Network error. Check your connection.";
      if (error.code === 'auth/user-not-found') errorMessage = "User not found.";
      if (error.code === 'auth/wrong-password') errorMessage = "Incorrect password.";
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
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

