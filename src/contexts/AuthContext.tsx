import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  login: (email: string, password: string) => Promise<boolean>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const signup = async (firstName: string, lastName: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      const result = await apiService.signup(fullName, email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem("epiphany_user", JSON.stringify(result.user));
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate Google OAuth flow
      // In production, this would use Google OAuth SDK
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo: Create a mock Google user
      // In production, you'd get this from Google OAuth response
      const mockGoogleUser: User = {
        id: `google-user-${Date.now()}`,
        name: "Google User",
        email: `google.user${Date.now()}@gmail.com`,
      };
      
      // Check if user exists, if not create one
      const existingUser = await apiService.getUserByEmail(mockGoogleUser.email);
      if (existingUser) {
        setUser(existingUser);
        localStorage.setItem("epiphany_user", JSON.stringify(existingUser));
      } else {
        // Create new user from Google account
        const signupResult = await apiService.signup(mockGoogleUser.name, mockGoogleUser.email, `google-${Date.now()}`);
        if (signupResult.success && signupResult.user) {
          setUser(signupResult.user);
          localStorage.setItem("epiphany_user", JSON.stringify(signupResult.user));
        }
      }
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Google login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const result = await apiService.login(email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem("epiphany_user", JSON.stringify(result.user));
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
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

