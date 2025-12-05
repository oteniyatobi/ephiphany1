import { useNavigate } from "react-router-dom";
import { MapPin, ShoppingBag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import heroImage from "@/assets/kigali-city.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: MapPin,
      title: "Tourism",
      description: "Discover Rwanda's culture & experiences",
      color: "bg-green-500/10 text-green-700",
      path: "/tourism",
    },
    {
      icon: ShoppingBag,
      title: "Marketplace",
      description: "Local products, art & souvenirs",
      color: "bg-purple-500/10 text-purple-700",
      path: "/marketplace",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Concerts, sports & festivals",
      color: "bg-orange-500/10 text-orange-700",
      path: "/events",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader 
        title="Welcome back!" 
        subtitle="How can we help you today?" 
        showBack={false}
        showProfile={true}
      >
        {/* Hero Banner */}
        <Card className="overflow-hidden border-0 mt-4">
          <div className="relative h-32">
            <img
              src={heroImage}
              alt="Kigali"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center px-4">
              <div className="text-white">
                <p className="text-sm font-medium">Explore Rwanda</p>
                <p className="text-xs opacity-90">Tourism • Marketplace • Events</p>
              </div>
            </div>
          </div>
        </Card>
      </AppHeader>

      {/* Services Grid */}
      <main className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">Our Services</h2>
        <div className="grid gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              {...service}
              onClick={() => navigate(service.path)}
            />
          ))}
        </div>

      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
