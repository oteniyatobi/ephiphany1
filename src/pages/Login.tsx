import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignUp) {
      const success = await signup(name, email, password);
      setIsLoading(false);
      
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to Epiphany! You can now explore Rwanda.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Sign up failed",
          description: "Email already exists. Please try logging in instead.",
          variant: "destructive",
        });
      }
    } else {
      const success = await login(email, password);
      setIsLoading(false);

      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Please check your email and password.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/80 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Rwandan pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--gold)) 35px, hsl(var(--gold)) 36px)`,
        }} />
      </div>

      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/welcome")}
        className="absolute top-6 left-6 text-white hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Logo */}
      <div className="relative z-10 flex justify-center mb-8">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 166 202"
          className="w-32 h-32 text-gold"
        >
          <path 
            d="M 49.01 141.59 C49.01,138.15 51.09,131.62 52.78,129.72 C53.65,128.74 56.31,127.45 58.68,126.85 C61.06,126.25 62.99,125.48 62.99,125.13 C62.98,124.78 59.56,122.52 55.39,120.11 C48.10,115.88 47.83,115.59 48.42,112.66 C50.31,103.18 51.01,101.90 55.31,99.95 C57.61,98.90 60.29,98.03 61.25,98.02 C64.48,97.98 63.02,96.52 55.37,92.16 L 47.77 87.83 L 48.44 82.74 C49.24,76.71 50.30,74.49 53.29,72.58 C55.50,71.17 108.87,56.53 109.50,57.17 C110.06,57.73 107.54,67.37 106.21,69.73 C104.89,72.08 102.60,72.88 79.10,79.23 L 66.69 82.59 L 73.77 86.79 C81.31,91.28 84.11,91.76 91.60,89.87 C94.06,89.25 96.31,88.98 96.60,89.26 C97.62,90.29 94.03,101.53 92.20,103.03 C91.17,103.87 85.31,105.84 79.17,107.41 C73.02,108.99 68.01,110.55 68.02,110.89 C68.05,111.76 80.06,118.59 82.72,119.25 C83.94,119.55 90.63,118.29 97.59,116.46 L 110.24 113.12 L 109.58 118.31 C108.51,126.78 107.00,128.04 93.41,131.77 C51.40,143.31 49.00,143.84 49.01,141.59 ZM 73.21 122.96 C75.26,122.39 77.18,121.52 77.49,121.02 C78.04,120.12 68.12,113.81 64.18,112.56 C61.41,111.68 54.00,113.73 54.00,115.38 C54.00,116.09 55.01,117.19 56.25,117.82 C57.49,118.45 60.52,120.09 62.98,121.48 C68.08,124.34 68.17,124.36 73.21,122.96 ZM 72.60 94.87 C75.07,94.25 76.92,93.24 76.72,92.62 C76.52,92.00 73.37,89.77 69.73,87.65 C64.07,84.37 62.53,83.90 59.28,84.45 C57.18,84.81 54.79,85.53 53.98,86.06 C52.74,86.86 52.91,87.33 55.00,88.95 C57.23,90.68 66.86,96.00 67.76,96.00 C67.95,96.00 70.13,95.49 72.60,94.87 Z" 
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Login/Sign Up Form */}
      <Card className="relative z-10 w-full max-w-md p-8 bg-card/95 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">{isSignUp ? "Create Account" : "Welcome Back"}</h1>
            <p className="text-muted-foreground">
              {isSignUp ? "Sign up to start exploring Rwanda" : "Sign in to continue to Epiphany"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isSignUp ? "Create a password" : "Enter your password"}
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full w-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading 
                ? (isSignUp ? "Creating account..." : "Signing in...") 
                : (isSignUp ? "Sign Up" : "Sign In")
              }
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            {isSignUp ? (
              <>
                <p>Already have an account?</p>
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In instead
                </Button>
              </>
            ) : (
              <>
                <p>Don't have an account?</p>
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            <p>Create an account or sign in to access Epiphany</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;

