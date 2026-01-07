import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
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
  const [googleResolve, setGoogleResolve] = useState<{ resolve: (val: any) => void } | null>(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const googleUser = await res.json();
        const { email, name } = googleUser;

        const existingUser = await apiService.getUserByEmail(email);

        if (existingUser) {
          setUser(existingUser);
          localStorage.setItem("epiphany_user", JSON.stringify(existingUser));
          setIsLoading(false);
          googleResolve?.resolve({ success: true, isNewUser: false });
        } else {
          setIsLoading(false);
          googleResolve?.resolve({ success: true, isNewUser: true, email, name });
        }
      } catch (error) {
        console.error("Google login error:", error);
        setIsLoading(false);
        googleResolve?.resolve({ success: false });
      }
      setGoogleResolve(null);
    },
    onError: () => {
      console.error("Google Login Failed");
      setIsLoading(false);
      googleResolve?.resolve({ success: false });
      setGoogleResolve(null);
    }
  });

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("epiphany_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("epiphany_user");
      }
    }
    setIsLoading(false);
  }, []);

  const signup = async (firstName: string, lastName: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      const fullName = `${firstName} ${lastName}`.trim();
      const result = await apiService.signup(fullName, email, password);

      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem("epiphany_user", JSON.stringify(result.user));
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, error: result.error };
    } catch (error) {
      console.error("Signup error:", error);
      setIsLoading(false);
      return { success: false, error: "Network error occurred" };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; isNewUser?: boolean; email?: string; name?: string }> => {
    return new Promise((resolve) => {
      setGoogleResolve({ resolve });
      googleLogin();
    });
  };

  const completeGoogleSignup = async (email: string, name: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const result = await apiService.signup(name, email, password);
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem("epiphany_user", JSON.stringify(result.user));
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, error: result.error };
    } catch (error) {
      console.error("Complete Google signup error:", error);
      setIsLoading(false);
      return { success: false, error: "Network error occurred" };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      const result = await apiService.login(email, password);

      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem("epiphany_user", JSON.stringify(result.user));
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, error: result.error };
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return { success: false, error: "Network error occurred" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("epiphany_user");
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

