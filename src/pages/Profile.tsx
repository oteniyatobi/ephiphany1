import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, MapPin, Star, Settings, HelpCircle, LogOut, Edit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editLocation, setEditLocation] = useState(user?.location || "Kigali, Rwanda");

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/welcome");
  };

  const handleEditProfile = () => {
    setIsEditOpen(true);
    setEditName(user?.name || "");
    setEditPhone(user?.phone || "");
    setEditLocation(user?.location || "Kigali, Rwanda");
  };

  const handleSaveProfile = () => {
    if (!user) return;
    
    // Update user in localStorage
    const updatedUser = {
      ...user,
      name: editName,
      phone: editPhone.trim() || undefined, // Remove phone if empty
      location: editLocation.trim() || "Kigali, Rwanda", // Default location
    };
    
    // Update in users list
    const existingUsers = localStorage.getItem("epiphany_users");
    if (existingUsers) {
      const users = JSON.parse(existingUsers);
      const updatedUsers = users.map((u: typeof user) => 
        u.email === user.email ? updatedUser : u
      );
      localStorage.setItem("epiphany_users", JSON.stringify(updatedUsers));
    }
    
    // Update current user
    localStorage.setItem("epiphany_user", JSON.stringify(updatedUser));
    
    // Reload page to reflect changes
    window.location.reload();
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsEditOpen(false);
  };

  const handleViewStats = (type: string) => {
    toast({
      title: `${type} History`,
      description: `Viewing your ${type.toLowerCase()} history...`,
    });
    // In a real app, this would navigate to a detailed stats page
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
        handleEditProfile();
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
          description: "You have 5 rewards available! Redeem them on your next purchase.",
        });
      }
    },
    { 
      icon: HelpCircle, 
      label: "Help & Support", 
      show: true,
      action: () => {
        window.open("mailto:support@epiphany.rw?subject=Epiphany App Support", "_blank");
        toast({
          title: "Opening Email",
          description: "Opening your email client to contact support...",
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
                    {isAuthenticated ? "Member" : "Guest"}
                  </Badge>
                </div>
                {isAuthenticated && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleEditProfile}
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
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
                  <span>{user?.location || "Kigali, Rwanda"}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card 
            className="p-4 text-center cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleViewStats("Tours")}
          >
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-xs text-muted-foreground">Tours</p>
          </Card>
          <Card 
            className="p-4 text-center cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleViewStats("Purchases")}
          >
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-xs text-muted-foreground">Purchases</p>
          </Card>
          <Card 
            className="p-4 text-center cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleViewStats("Events")}
          >
            <p className="text-2xl font-bold text-orange-600">0</p>
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

      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                value={user?.email || ""}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number (Optional)</Label>
              <Input
                id="edit-phone"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
              <p className="text-xs text-muted-foreground">Leave empty to remove phone number</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder="Enter your location"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSaveProfile}
                className="flex-1"
              >
                Save Changes
              </Button>
              <Button 
                variant="outline"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Profile;
