import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Music, Trophy, PartyPopper, Clock, Ticket, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import { useToast } from "@/hooks/use-toast";
import bkArena from "@/assets/bk-arena.jpg";
import amahoroStadium from "@/assets/amahoro-stadium.jpg";
import centuryCinema from "@/assets/century-cinema.jpg";
import genocideMemorial from "@/assets/genocide-memorial.jpg";

const Events = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { name: "All", icon: Calendar },
    { name: "Concerts", icon: Music },
    { name: "Sports", icon: Trophy },
    { name: "Festivals", icon: PartyPopper },
  ];

  const events = [
    {
      id: "event-1",
      title: "Kigali Jazz Junction",
      category: "Concert",
      date: "Dec 15, 2025",
      time: "7:00 PM",
      venue: "BK Arena",
      location: "Remera, Kigali",
      price: "RWF 25,000",
      image: bkArena,
      featured: true,
      ticketsLeft: 150,
      ticketUrl: "https://www.eventbrite.com/d/rwanda--kigali/events/",
    },
    {
      id: "event-2",
      title: "APR FC vs Rayon Sports",
      category: "Sports",
      date: "Dec 20, 2025",
      time: "3:00 PM",
      venue: "Amahoro Stadium",
      location: "Nyamirambo, Kigali",
      price: "RWF 5,000",
      image: amahoroStadium,
      featured: true,
      ticketsLeft: 500,
      ticketUrl: "https://www.rwandafootball.com/",
    },
    {
      id: "event-3",
      title: "Ubumuntu Arts Festival",
      category: "Festival",
      date: "Jan 5-7, 2026",
      time: "All Day",
      venue: "Kigali Genocide Memorial",
      location: "Gisozi, Kigali",
      price: "RWF 15,000",
      image: genocideMemorial,
      featured: false,
      ticketsLeft: 300,
      ticketUrl: "https://www.ubumuntuartsfestival.com/",
    },
    {
      id: "event-4",
      title: "Rwanda Film Festival (Hillywood)",
      category: "Festival",
      date: "Jan 12-14, 2026",
      time: "6:00 PM",
      venue: "Century Cinema",
      location: "City Center, Kigali",
      price: "RWF 10,000",
      image: centuryCinema,
      featured: false,
      ticketsLeft: 200,
      ticketUrl: "https://www.rwandafilmfestival.com/",
    },
    {
      id: "event-5",
      title: "Kigali Up Music Festival",
      category: "Concert",
      date: "Feb 1, 2026",
      time: "5:00 PM",
      venue: "Amahoro Stadium",
      location: "Remera, Kigali",
      price: "RWF 50,000",
      image: amahoroStadium,
      featured: true,
      ticketsLeft: 1000,
      ticketUrl: "https://www.eventbrite.com/d/rwanda--kigali/music/",
    },
    {
      id: "event-6",
      title: "Rwanda Basketball League Finals",
      category: "Sports",
      date: "Feb 8, 2026",
      time: "4:00 PM",
      venue: "BK Arena",
      location: "Remera, Kigali",
      price: "RWF 8,000",
      image: bkArena,
      featured: false,
      ticketsLeft: 400,
      ticketUrl: "https://www.rwandabasketball.com/",
    },
    {
      id: "event-7",
      title: "Rwanda Cultural Festival",
      category: "Festival",
      date: "Mar 15-17, 2026",
      time: "All Day",
      venue: "Amahoro Stadium",
      location: "Remera, Kigali",
      price: "RWF 20,000",
      image: amahoroStadium,
      featured: false,
      ticketsLeft: 800,
      ticketUrl: "https://www.eventbrite.com/d/rwanda--kigali/festivals/",
    },
    {
      id: "event-8",
      title: "Kigali Fashion Week",
      category: "Festival",
      date: "Apr 5-7, 2026",
      time: "7:00 PM",
      venue: "BK Arena",
      location: "Remera, Kigali",
      price: "RWF 30,000",
      image: bkArena,
      featured: true,
      ticketsLeft: 200,
      ticketUrl: "https://www.eventbrite.com/d/rwanda--kigali/fashion/",
    },
    {
      id: "event-9",
      title: "Rwanda Tech Summit",
      category: "Festival",
      date: "May 10-12, 2026",
      time: "9:00 AM",
      venue: "Kigali Convention Centre",
      location: "Kacyiru, Kigali",
      price: "RWF 50,000",
      image: centuryCinema,
      featured: false,
      ticketsLeft: 300,
      ticketUrl: "https://www.eventbrite.com/d/rwanda--kigali/technology/",
    },
  ];

  const featuredEvents = events.filter((event) => event.featured);

  // Filter events based on search and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const categoryMap: Record<string, string> = {
      "All": "",
      "Concerts": "Concert",
      "Sports": "Sports",
      "Festivals": "Festival",
    };
    
    const matchesCategory = selectedCategory === "All" || event.category === categoryMap[selectedCategory];
    
    return matchesSearch && matchesCategory;
  });

  const filteredFeaturedEvents = featuredEvents.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    
    const categoryMap: Record<string, string> = {
      "All": "",
      "Concerts": "Concert",
      "Sports": "Sports",
      "Festivals": "Festival",
    };
    
    const matchesCategory = selectedCategory === "All" || event.category === categoryMap[selectedCategory];
    
    return matchesSearch && matchesCategory;
  });

  const handleTicketPurchase = (event: typeof events[0]) => {
    toast({
      title: "Redirecting...",
      description: `Taking you to purchase tickets for ${event.title}`,
    });
    window.open(event.ticketUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Events" subtitle="Discover & book tickets">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-10 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </AppHeader>

      <main className="px-4 py-6 space-y-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            return (
              <Badge
                key={category.name}
                variant={isSelected ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap px-4 py-2"
                onClick={() => setSelectedCategory(category.name)}
              >
                <Icon className="h-4 w-4 mr-1" />
                {category.name}
              </Badge>
            );
          })}
        </div>

        {/* Featured Events */}
        {filteredFeaturedEvents.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">Featured Events</h2>
            </div>
            <div className="space-y-3">
              {filteredFeaturedEvents.map((event) => (
              <Card key={event.id} className="p-0 overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="flex">
                  <div className="w-24 h-24 overflow-hidden flex-shrink-0">
                    <img 
                      src={event.image} 
                      alt={event.venue}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{event.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date}</span>
                          <Clock className="h-3 w-3 ml-1" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{event.price}</span>
                      <Button 
                        size="sm" 
                        className="h-7"
                        onClick={() => handleTicketPurchase(event)}
                      >
                        <Ticket className="h-3 w-3 mr-1" />
                        Buy Tickets
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Events */}
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">
            {filteredEvents.length === events.length 
              ? "Upcoming Events" 
              : `Found ${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`}
          </h2>
          {filteredEvents.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No events found. Try a different search or category.</p>
            </Card>
          ) : (
            <div className="grid gap-3">
              {filteredEvents.map((event) => (
              <Card key={event.id} className="p-4 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={event.image} 
                        alt={event.venue}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{event.title}</h3>
                      <Badge variant="outline" className="text-xs mb-2">
                        {event.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{event.venue}, {event.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-primary block">{event.price}</span>
                    <span className="text-xs text-muted-foreground">
                      {event.ticketsLeft} left
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MapPin className="h-4 w-4" />
                      Directions
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleTicketPurchase(event)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Buy Tickets
                    </Button>
                  </div>
                </div>
              </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Events;
