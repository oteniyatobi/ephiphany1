import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Music, Trophy, PartyPopper, Clock, Ticket, ExternalLink, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import BookingModal from "@/components/BookingModal";
import { handleExternalLink } from "@/utils/linkHandler";
import { apiService } from "@/services/api";

const Events = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [events, setEvents] = useState<any[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoadingEvents(true);
      const data = await apiService.getEvents();
      setEvents(data);
      setIsLoadingEvents(false);
    };
    fetchEvents();
  }, []);

  const handleBookTicket = (event: typeof events[0]) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book tickets.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    setSelectedEvent(event);
    setIsBookingModalOpen(true);
  };

  const categories = [
    { name: "All", icon: Calendar },
    { name: "Concerts", icon: Music },
    { name: "Sports", icon: Trophy },
    { name: "Festivals", icon: PartyPopper },
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



  const handleTicketPurchase = (event: typeof events[0], e?: React.MouseEvent) => {
    handleExternalLink(event.ticketUrl, `Redirecting to ${event.title} Booking`, e);
  };

  const handleDirections = (venue: string, location: string, e?: React.MouseEvent) => {
    const query = encodeURIComponent(`${venue}, ${location}, Rwanda`);
    handleExternalLink(`https://www.google.com/maps/search/?api=1&query=${query}`, `Opening Maps for ${venue}`, e);
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
        {isLoadingEvents ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p>Loading events...</p>
          </div>
        ) : (
          <>
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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDirections(event.venue, event.location)}
                          >
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
          </>
        )}
      </main>

      <BottomNav />
      {selectedEvent && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          item={selectedEvent}
          type="event"
        />
      )}
    </div>
  );
};

export default Events;
