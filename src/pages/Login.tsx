import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle, completeGoogleSignup } = useAuth();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [pendingGoogleUser, setPendingGoogleUser] = useState<{ email: string; name: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignUp) {
      const result = await signup(firstName, lastName, email, password);
      setIsLoading(false);

      if (result.success) {
        toast({
          title: "Account created!",
          description: "Welcome to Epiphany! You can now explore Rwanda.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Sign up failed",
          description: result.error || "Please try a different email or check your connection.",
          variant: "destructive",
        });
      }
    } else {
      const result = await login(email, password);
      setIsLoading(false);

      if (result.success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Please check your email and password.",
          variant: "destructive",
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await loginWithGoogle();
      if (result.success) {
        if (result.isNewUser) {
          // Show password setup form
          setPendingGoogleUser({ email: result.email!, name: result.name! });
          toast({
            title: "Almost there!",
            description: "Please create a password for your new account.",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in with Google.",
          });
          navigate("/dashboard");
        }
      } else {
        toast({
          title: "Google sign in failed",
          description: "Please try again or use email/password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleCompleteGoogleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingGoogleUser) return;

    setIsLoading(true);
    const result = await completeGoogleSignup(pendingGoogleUser.email, pendingGoogleUser.name, password);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Registration complete!",
        description: "Your account is now ready.",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to complete registration. Please try again.",
        variant: "destructive",
      });
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

          {pendingGoogleUser ? (
            <form onSubmit={handleCompleteGoogleSignup} className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold">Set your password</h2>
                <p className="text-sm text-muted-foreground">Continuing as <span className="font-semibold">{pendingGoogleUser.email}</span></p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-password">Choose a password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="create-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 6 characters"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoFocus
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

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Setting up..." : "Complete Setup"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setPendingGoogleUser(null)}
                  className="w-full text-xs"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              {/* Google Sign In Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading || isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {isGoogleLoading ? "Signing in..." : "Continue with Google"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          className="pl-10"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                      onClick={() => {
                        setIsSignUp(false);
                        setFirstName("");
                        setLastName("");
                      }}
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
                      onClick={() => {
                        setIsSignUp(true);
                        setFirstName("");
                        setLastName("");
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </>
          )}

          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            <p>Create an account or sign in to access Epiphany</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;

