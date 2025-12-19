import { useNavigate } from "react-router-dom";
import { MapPin, ShoppingBag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ServiceCard from "@/components/ServiceCard";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import { useToast } from "@/hooks/use-toast";
import { events, products, experiences } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/kigali-city.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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

  // Get dynamic data


  const featuredEvent = events.find(e => e.featured) || events[0];
  const trendingProducts = products.slice(0, 4);
  const featuredExperience = experiences[2]; // Gorilla Trekking

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader
        title={user ? `Welcome back, ${user.name.split(' ')[0]}!` : "Welcome back!"}
        subtitle="How can we help you today?"
        showBack={false}
        showProfile={true}
      >
        {/* Dynamic Hero Banner - Featured Event */}
        <Card className="overflow-hidden border-0 mt-4 cursor-pointer" onClick={() => navigate('/events')}>
          <div className="relative h-40">
            <img
              src={featuredEvent.image}
              alt={featuredEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
              <div className="text-white">
                <Badge className="bg-primary text-primary-foreground mb-2 hover:bg-primary">Featured Event</Badge>
                <h3 className="font-bold text-lg leading-tight mb-1">{featuredEvent.title}</h3>
                <div className="flex items-center text-xs opacity-90">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span className="mr-3">{featuredEvent.date}</span>
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{featuredEvent.location}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </AppHeader>

      <main className="px-4 py-6 space-y-8">
        {/* Services Grid */}
        <section>
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
        </section>

        {/* Trending Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Trending in Marketplace</h2>
            <Button variant="link" className="text-sm h-auto p-0" onClick={() => navigate('/marketplace')}>View All</Button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
            {trendingProducts.map((product) => (
              <Card key={product.id} className="min-w-[160px] overflow-hidden flex-shrink-0 cursor-pointer" onClick={() => navigate('/marketplace')}>
                <div className="h-32 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recommended Experience */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Recommended Experience</h2>
          <Card className="overflow-hidden cursor-pointer" onClick={() => navigate('/tourism')}>
            <div className="h-32 relative">
              <img src={featuredExperience.image} alt={featuredExperience.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary">
                {featuredExperience.price}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{featuredExperience.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{featuredExperience.category} • {featuredExperience.location}</p>
            </div>
          </Card>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
