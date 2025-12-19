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

    return new Promise((resolve) => {
      // 1. Open the high-fidelity mock popup
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        "/mock-google-auth",
        "Google Sign In",
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // 2. Define message handler
      const handleMessage = async (event: MessageEvent) => {
        // Verify origin if needed (skipping for localhost simplicity)
        if (event.data?.type === "GOOGLE_AUTH_SUCCESS") {
          window.removeEventListener("message", handleMessage);

          try {
            const { email, name } = event.data;

            // 3. Create/Get user logic (simulate backend verification)
            const mockGoogleUser: User = {
              id: `google-user-${Date.now()}`,
              name: name || "Demo User",
              email: email || "demo.user@gmail.com",
            };

            // Reuse existing logic to sync with backend
            const existingUser = await apiService.getUserByEmail(mockGoogleUser.email);
            if (existingUser) {
              setUser(existingUser);
              localStorage.setItem("epiphany_user", JSON.stringify(existingUser));
            } else {
              // Sign up if user doesn't exist
              const signupResult = await apiService.signup(mockGoogleUser.name, mockGoogleUser.email, `google-${Date.now()}`);
              if (signupResult.success && signupResult.user) {
                setUser(signupResult.user);
                localStorage.setItem("epiphany_user", JSON.stringify(signupResult.user));
              }
            }

            setIsLoading(false);
            resolve(true);
          } catch (error) {
            console.error("Google auth post-processing error", error);
            setIsLoading(false);
            resolve(false);
          }
        }
      };

      // 3. Attach listener
      window.addEventListener("message", handleMessage);

      // 4. Handle popup closure without success
      const checkPopup = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkPopup);
          window.removeEventListener("message", handleMessage);
          // If we are still loading, it means user closed popup without finishing
          // We can't easily access 'isLoading' state inside interval closure reference cleanly in a promise
          // But effectively if the promise hasn't resolved, we should resolve false.
          // However, resolve acts only once. 
          // We'll rely on the user interface state or timeout if needed, but for now let's assume successful flow or manual close.
          // Ideally we'd resolve(false) here, but ensuring we don't double-resolve is key.
          // A simple way is to check a flag or just let the spinner spin for a moment then stop?
          // Better: actually resolve(false) if we didn't receive success.
          // But 'handleMessage' might race. Let's just keep it simple.
          setIsLoading(false);
          // We can resolve false to stop the spinner
          resolve(false);
        }
      }, 1000);
    });
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

