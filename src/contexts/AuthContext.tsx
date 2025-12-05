import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  signup: (name: string, email: string, password: string) => Promise<boolean>;
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

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists (demo - check localStorage)
    const existingUsers = localStorage.getItem("epiphany_users");
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    
    if (users.find((u: User) => u.email === email)) {
      setIsLoading(false);
      return false; // User already exists
    }
    
    if (name && email && password) {
      const newUser: User = {
        id: "user-" + Date.now(),
        name: name,
        email: email,
        // Phone number is optional - user can add it later in profile
      };
      
      // Store user in users list
      users.push(newUser);
      localStorage.setItem("epiphany_users", JSON.stringify(users));
      
      // Also store user credentials (demo only - in production use secure backend)
      const credentials = JSON.parse(localStorage.getItem("epiphany_credentials") || "[]");
      credentials.push({ email, password });
      localStorage.setItem("epiphany_credentials", JSON.stringify(credentials));
      
      setUser(newUser);
      localStorage.setItem("epiphany_user", JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - in real app, this would call your backend
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check credentials (demo - check localStorage)
    const credentials = JSON.parse(localStorage.getItem("epiphany_credentials") || "[]");
    const userCredential = credentials.find((c: { email: string; password: string }) => c.email === email);
    
    if (userCredential && userCredential.password === password) {
      // Find user in users list
      const existingUsers = localStorage.getItem("epiphany_users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      const foundUser = users.find((u: User) => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("epiphany_user", JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      }
    }
    
    setIsLoading(false);
    return false;
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

