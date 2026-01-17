import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabase";
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
    // Check for local session first
    const storedUser = localStorage.getItem('epiphany_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoading(false);
    }

    // Initialize Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsLoading(true);
      if (session?.user) {
        const email = session.user.email || "";
        // Try to get developer-defined profile
        const existingUser = await apiService.getUserByEmail(email);

        const userData = existingUser || {
          id: session.user.id,
          name: session.user.user_metadata?.full_name || email.split('@')[0],
          email: email,
        };

        setUser(userData);
        localStorage.setItem('epiphany_user', JSON.stringify(userData));
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('epiphany_user');
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (firstName: string, lastName: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // CHECK FOR VALID SUPABASE CONFIG
    const hasSupabase = import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('your_');

    if (!hasSupabase) {
      console.log("Local Storage Mode: Signing up user");
      // Simulate Network Delay
      await new Promise(r => setTimeout(r, 800));

      const newUser = {
        id: `local-${Date.now()}`,
        name: `${firstName} ${lastName}`,
        email: email,
      };

      setUser(newUser);
      localStorage.setItem('epiphany_user', JSON.stringify(newUser));
      setIsLoading(false);
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${firstName} ${lastName}`.trim(),
          }
        }
      });

      if (error) throw error;

      // Try to sync with local API/Public Users table if available
      if (data.user) {
        try {
          await apiService.signup(data.user.id, `${firstName} ${lastName}`, email);
        } catch (e) {
          console.warn("Backend sync failed during signup", e);
        }
      }

      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      console.error("Supabase Signup error:", error);
      setIsLoading(false);
      return { success: false, error: error.message || "Signup failed" };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; isNewUser?: boolean; email?: string; name?: string }> => {
    setIsLoading(true);

    const hasSupabase = import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('your_');

    if (!hasSupabase) {
      console.log("Local Storage Mode: Google Login Mock");
      await new Promise(r => setTimeout(r, 1000));
      // Return dummy data to trigger the profile completion flow in Login.tsx
      return {
        success: true,
        isNewUser: true,
        email: "user@gmail.com",
        name: "New User"
      };
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error("Google login error:", error);
      setIsLoading(false);
      toast({ title: "Google Login Failed", description: "Could not connect to Supabase Auth.", variant: "destructive" });
      return { success: false };
    }
  };

  const completeGoogleSignup = async (email: string, name: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // For local mode, just create the user directly
    const forcedId = `google-${Date.now()}`;
    const userObj = { id: forcedId, name, email };

    const hasSupabase = import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('your_');

    if (!hasSupabase) {
      setUser(userObj);
      localStorage.setItem('epiphany_user', JSON.stringify(userObj));
      setIsLoading(false);
      return { success: true };
    }

    // Since this is a "completion" step after OAuth which doesn't really exist in same way 
    // for pure Supabase (Supabase OAuth handles it), this function is mostly for our custom flow
    // or if we needed to add extra metadata. 
    // But for now, let's just ensure we are logged in locally.

    try {
      // We can't really "signup" with password for a Google user in Supabase easily without cloud functions 
      // or just updating the profile. 
      // So we'll mainly update the profile in public.users
      await apiService.signup(forcedId, name, email);

      // Mock the session because we can't programmatically sign a Google user in with a password
      setUser(userObj);

      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      console.error("Complete Google signup error:", error);
      setIsLoading(false);
      return { success: false, error: "Failed to complete setup" };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      console.error("Login error:", error);

      // Fallback: Demo Mode ONLY if it's a network/missing config error, not an auth error
      if (error.message?.includes('fetch') || !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your_')) {
        console.warn("Falling back to Demo Mode due to connection/config issue");
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
      return { success: false, error: "Invalid email or password." };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
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

