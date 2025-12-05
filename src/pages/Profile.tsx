import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, MapPin, Star, Settings, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/welcome");
  };

  const menuItems: Array<{
    icon: typeof Settings;
    label: string;
    path?: string;
    badge?: string;
    variant?: "destructive";
    show?: boolean;
    action?: () => void;
  }> = [
    { 
      icon: Settings, 
      label: "Account Settings", 
      show: isAuthenticated,
      action: () => {
        toast({
          title: "Account Settings",
          description: "Account settings feature coming soon!",
        });
      }
    },
    { 
      icon: Star, 
      label: "Rewards & Loyalty", 
      badge: "5 rewards", 
      show: isAuthenticated,
      action: () => {
        toast({
          title: "Rewards & Loyalty",
          description: "You have 5 rewards available!",
        });
      }
    },
    { 
      icon: HelpCircle, 
      label: "Help & Support", 
      show: true,
      action: () => {
        toast({
          title: "Help & Support",
          description: "Contact us at support@epiphany.rw",
        });
      }
    },
    { 
      icon: LogOut, 
      label: isAuthenticated ? "Log Out" : "Sign In", 
      variant: isAuthenticated ? "destructive" : undefined, 
      show: true, 
      action: isAuthenticated ? handleLogout : () => navigate("/login") 
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Profile" subtitle="Manage your account" />

      <main className="p-4 space-y-6">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {user ? user.name.substring(0, 2).toUpperCase() : "GU"}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold">{user?.name || "Guest User"}</h2>
                  <Badge variant="secondary" className="mt-1">
                    <Star className="h-3 w-3 mr-1 fill-gold text-gold" />
                    {isAuthenticated ? "Gold Member" : "Guest"}
                  </Badge>
                </div>
                {isAuthenticated && (
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                )}
              </div>
              
              <div className="space-y-1 text-sm text-muted-foreground">
                {user?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    <span>{user.email}</span>
                  </div>
                )}
                {user?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>Kigali, Rwanda</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">12</p>
            <p className="text-xs text-muted-foreground">Tours</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">23</p>
            <p className="text-xs text-muted-foreground">Purchases</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">8</p>
            <p className="text-xs text-muted-foreground">Events</p>
          </Card>
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.filter(item => item.show !== false).map((item, index) => {
            const Icon = item.icon;
            const isDestructive = item.variant === "destructive";
            
            return (
              <Card
                key={index}
                className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                  isDestructive ? "hover:border-destructive/50" : ""
                }`}
                onClick={item.action || (() => {})}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isDestructive ? "bg-destructive/10" : "bg-primary/10"
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        isDestructive ? "text-destructive" : "text-primary"
                      }`} />
                    </div>
                    <span className={`font-medium ${
                      isDestructive ? "text-destructive" : ""
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary">{item.badge}</Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground pt-4 space-y-1">
          <p>Epiphany v1.0.0</p>
          <p>Powered by Mind Storms®</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
