import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Users, Star, Calendar, Plus, Sparkles, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import { useToast } from "@/hooks/use-toast";
import bannerImage from "@/assets/rwanda-tourism-banner.jpg";
import genocideMemorial from "@/assets/genocide-memorial.jpg";
import nyamataMemorial from "@/assets/nyamata-memorial.jpg";
import volcanoesPark from "@/assets/volcanoes-park.jpg";
import lakeKivuTour from "@/assets/lake-kivu-tour.jpg";
import inemaArtsCenter from "@/assets/inema-arts-center.jpg";
import bugeseraLakeResort from "@/assets/bugesera-lake-resort.jpg";

const Tourism = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const experiences = [
    {
      id: "tour-1",
      title: "Kigali Genocide Memorial",
      category: "Cultural Heritage",
      duration: "2-3 hours",
      price: "Free",
      rating: 4.9,
      reviews: 1200,
      image: genocideMemorial,
      location: "Gisozi, Kigali",
      bookingUrl: "https://www.kgm.rw/visit",
    },
    {
      id: "tour-2",
      title: "Nyamata Church Memorial",
      category: "Historical Site",
      duration: "Half Day",
      price: "RWF 15,000",
      rating: 4.8,
      reviews: 850,
      image: nyamataMemorial,
      location: "Nyamata, Bugesera",
      bookingUrl: "https://visitrwanda.com/interests/memorials/",
    },
    {
      id: "tour-3",
      title: "Volcanoes National Park - Gorilla Trekking",
      category: "Nature & Wildlife",
      duration: "Full Day",
      price: "RWF 150,000",
      rating: 5.0,
      reviews: 2100,
      image: volcanoesPark,
      location: "Musanze District",
      bookingUrl: "https://visitrwanda.com/interests/gorilla-tracking/",
    },
    {
      id: "tour-4",
      title: "Inema Arts Center",
      category: "Art & Culture",
      duration: "1-2 hours",
      price: "RWF 5,000",
      rating: 4.7,
      reviews: 420,
      image: inemaArtsCenter,
      location: "Kacyiru, Kigali",
      bookingUrl: "https://visitrwanda.com/interests/arts-culture/",
    },
    {
      id: "tour-5",
      title: "Lake Kivu Boat Tour",
      category: "Adventure",
      duration: "4-5 hours",
      price: "RWF 30,000",
      rating: 4.8,
      reviews: 680,
      image: lakeKivuTour,
      location: "Karongi, Western Province",
      bookingUrl: "https://visitrwanda.com/interests/lakes/",
    },
    {
      id: "tour-6",
      title: "Akagera National Park Safari",
      category: "Nature & Wildlife",
      duration: "Full Day",
      price: "RWF 80,000",
      rating: 4.9,
      reviews: 1500,
      image: volcanoesPark, // Using existing image as placeholder
      location: "Eastern Province",
      bookingUrl: "https://visitrwanda.com/interests/national-parks/akagera-national-park/",
    },
    {
      id: "tour-7",
      title: "Nyungwe Forest Canopy Walk",
      category: "Adventure",
      duration: "3-4 hours",
      price: "RWF 60,000",
      rating: 4.8,
      reviews: 920,
      image: lakeKivuTour, // Using existing image as placeholder
      location: "Nyungwe, Southern Province",
      bookingUrl: "https://visitrwanda.com/interests/national-parks/nyungwe-national-park/",
    },
    {
      id: "tour-8",
      title: "King's Palace Museum",
      category: "Cultural Heritage",
      duration: "1-2 hours",
      price: "RWF 10,000",
      rating: 4.6,
      reviews: 650,
      image: genocideMemorial, // Using existing image as placeholder
      location: "Nyanza, Southern Province",
      bookingUrl: "https://visitrwanda.com/interests/museums/",
    },
    {
      id: "tour-9",
      title: "Bugesera Lake Resort",
      category: "Accommodation",
      duration: "Per Night",
      price: "RWF 100,000",
      rating: 4.8,
      reviews: 520,
      image: bugeseraLakeResort,
      location: "Bugesera District",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Rwanda",
    },
  ];

  const categories = [
    "All", "Cultural", "Nature", "Adventure", "Historical", "Art"
  ];

  // Filter experiences based on search and category
  const filteredExperiences = experiences.filter((experience) => {
    const matchesSearch = 
      experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || 
      experience.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  const handleBooking = (experience: typeof experiences[0]) => {
    toast({
      title: "Redirecting...",
      description: `Taking you to book ${experience.title}`,
    });
    window.open(experience.bookingUrl, "_blank");
  };

  const handleHotelBooking = (hotel: { id: string; name: string; bookingUrl: string }) => {
    toast({
      title: "Redirecting...",
      description: `Taking you to book ${hotel.name}`,
    });
    window.open(hotel.bookingUrl, "_blank");
  };

  const handleItineraryView = (itineraryName: string, url: string) => {
    toast({
      title: "Opening Itinerary",
      description: `Taking you to ${itineraryName} details`,
    });
    window.open(url, "_blank");
  };

  const handleStartPlanning = () => {
    toast({
      title: "Redirecting...",
      description: "Taking you to plan your custom journey",
    });
    window.open("https://visitrwanda.com/plan-your-trip/", "_blank");
  };

  const handleViewAllItineraries = () => {
    // Scroll to experiences section
    const experiencesSection = document.querySelector('[data-section="experiences"]');
    if (experiencesSection) {
      experiencesSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback: redirect to Visit Rwanda itineraries
      window.open("https://visitrwanda.com/interests/", "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Tourism & Experiences" subtitle="Discover the beauty of Rwanda">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search experiences..."
            className="pl-10 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </AppHeader>

      <main className="p-4 space-y-6">
        {/* Featured Banner */}
        <Card className="relative overflow-hidden border-green-500/20">
          <div className="absolute inset-0">
            <img 
              src={bannerImage} 
              alt="Rwanda Tourism" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          </div>
          <div className="relative z-10 p-6 text-white">
            <h3 className="font-semibold text-lg mb-2">🇷🇼 Experience Rwanda</h3>
            <p className="text-sm text-white/90 mb-3">
              From mountain gorillas to cultural heritage sites
            </p>
            <Badge className="bg-green-600 text-white">Featured</Badge>
          </div>
        </Card>

        {/* Curated Itineraries */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Curated Itineraries</h2>
            <Button variant="ghost" size="sm" onClick={handleViewAllItineraries}>View All</Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Card className="min-w-[280px] p-4 bg-gradient-to-br from-primary/10 to-accent/5 cursor-pointer hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <Badge className="bg-primary text-primary-foreground">Popular</Badge>
              </div>
              <h3 className="font-semibold mb-2">3-Day Cultural Journey</h3>
              <p className="text-sm text-muted-foreground mb-3">Kigali memorials, Inema Arts, Traditional dance</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">RWF 180,000</span>
                <Button 
                  size="sm" 
                  onClick={() => handleItineraryView("3-Day Cultural Journey", "https://visitrwanda.com/interests/cultural-heritage/")}
                >
                  View Details
                </Button>
              </div>
            </Card>
            <Card className="min-w-[280px] p-4 bg-gradient-to-br from-accent/10 to-primary/5 cursor-pointer hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-5 w-5 text-accent" />
                <Badge className="bg-accent text-accent-foreground">Weekend</Badge>
              </div>
              <h3 className="font-semibold mb-2">Lake Kivu Escape</h3>
              <p className="text-sm text-muted-foreground mb-3">Boat tours, beach activities, local cuisine</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">RWF 120,000</span>
                <Button 
                  size="sm" 
                  onClick={() => handleItineraryView("Lake Kivu Escape", "https://visitrwanda.com/interests/lakes/")}
                >
                  View Details
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Custom Itinerary Maker */}
        <Card className="p-4 bg-gradient-to-r from-gold/10 to-gold/5 border-gold/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-gold" />
              <div>
                <h3 className="font-semibold">Create Your Journey</h3>
                <p className="text-xs text-muted-foreground">Build a custom itinerary</p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="bg-gold text-gold-foreground hover:bg-gold/90"
              onClick={handleStartPlanning}
            >
              Start Planning
            </Button>
          </div>
          <div className="flex gap-2 mt-3">
            <Badge variant="outline" className="text-xs">Mix & Match</Badge>
            <Badge variant="outline" className="text-xs">Flexible Dates</Badge>
            <Badge variant="outline" className="text-xs">Expert Tips</Badge>
          </div>
        </Card>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Hotels Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Featured Hotels</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open("https://www.booking.com/searchresults.html?ss=Rwanda", "_blank")}
            >
              View All
            </Button>
          </div>
          <div className="grid gap-3">
            {[
              { id: "hotel-1", name: "Radisson Blu Hotel Kigali", rating: 4.8, price: "RWF 180,000", amenities: "Pool • Spa • Restaurant", location: "Kacyiru, Kigali", bookingUrl: "https://www.booking.com/hotel/rw/radisson-blu-hotel-and-convention-center-kigali.html" },
              { id: "hotel-2", name: "Kigali Marriott Hotel", rating: 4.9, price: "RWF 200,000", amenities: "Gym • Bar • Conference", location: "Nyarugenge, Kigali", bookingUrl: "https://www.booking.com/hotel/rw/kigali-marriott.html" },
              { id: "hotel-3", name: "Kigali Serena Hotel", rating: 4.7, price: "RWF 175,000", amenities: "Garden • WiFi • Parking", location: "City Center, Kigali", bookingUrl: "https://www.booking.com/hotel/rw/kigali-serena.html" },
              { id: "hotel-4", name: "The Retreat Kigali", rating: 4.9, price: "RWF 220,000", amenities: "Spa • Restaurant • Pool", location: "Kacyiru, Kigali", bookingUrl: "https://www.booking.com/hotel/rw/the-retreat-kigali.html" },
              { id: "hotel-5", name: "Ubumwe Grand Hotel", rating: 4.6, price: "RWF 120,000", amenities: "Restaurant • WiFi • Parking", location: "City Center, Kigali", bookingUrl: "https://www.booking.com/hotel/rw/ubumwe-grand.html" },
            ].map((hotel) => (
              <Card key={hotel.id} className="p-4 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{hotel.amenities}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">{hotel.price}/night</span>
                  <Button 
                    size="sm"
                    onClick={() => handleHotelBooking(hotel)}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Book Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="space-y-4" data-section="experiences">
          <h2 className="font-semibold">
            {filteredExperiences.length === experiences.length 
              ? "Popular Experiences" 
              : `Found ${filteredExperiences.length} experience${filteredExperiences.length !== 1 ? 's' : ''}`}
          </h2>
          {filteredExperiences.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No experiences found. Try a different search or category.</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredExperiences.map((experience, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {typeof experience.image === 'string' && experience.image.startsWith('�') ? (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center text-4xl">
                        {experience.image}
                      </div>
                    ) : (
                      <img 
                        src={experience.image} 
                        alt={experience.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Experience Info */}
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-semibold mb-1">{experience.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {experience.category}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-gold text-gold" />
                        <span className="font-medium">{experience.rating}</span>
                        <span>({experience.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{experience.price}</span>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7"
                        onClick={() => handleBooking(experience)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Book Now
                      </Button>
                    </div>
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

export default Tourism;
