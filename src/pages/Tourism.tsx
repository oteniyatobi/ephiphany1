import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleExternalLink } from "@/utils/linkHandler";
import { MapPin, Clock, Users, Star, Calendar, Plus, Sparkles, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import { useToast } from "@/hooks/use-toast";
import { experiences, hotels } from "@/data/mockData";
import bannerImage from "@/assets/rwanda-tourism-banner.jpg";
import genocideMemorial from "@/assets/genocide-memorial.jpg";
import nyamataMemorial from "@/assets/nyamata-memorial.jpg";
import volcanoesPark from "@/assets/volcanoes-park.jpg";
import lakeKivuTour from "@/assets/lake-kivu-tour.jpg";
import inemaArtsCenter from "@/assets/inema-arts-center.jpg";
import bugeseraLakeResort from "@/assets/bugesera-lake-resort.jpg";
import kigaliCity from "@/assets/kigali-city.jpg";
import kigaliHero from "@/assets/kigali-hero.jpg";

// Data moved to shared file

const Tourism = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const handleBooking = (experience: typeof experiences[0], e?: React.MouseEvent) => {
    handleExternalLink(experience.bookingUrl, `Booking ${experience.title}`, e);
  };

  const handleHotelBooking = (hotel: { id: string; name: string; bookingUrl: string }, e?: React.MouseEvent) => {
    handleExternalLink(hotel.bookingUrl, `Booking at ${hotel.name}`, e);
  };

  const handleItineraryView = (itineraryName: string, url: string, e?: React.MouseEvent) => {
    handleExternalLink(url, `Viewing ${itineraryName}`, e);
  };

  const handleStartPlanning = () => {
    handleExternalLink("https://visitrwanda.com/plan-your-trip/", "Planning Your Journey");
  };

  const handleViewAllItineraries = () => {
    // Scroll to experiences section
    const experiencesSection = document.querySelector('[data-section="experiences"]');
    if (experiencesSection) {
      experiencesSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback: redirect to Visit Rwanda itineraries
      toast({
        title: "Redirecting...",
        description: "Taking you to view all itineraries",
      });
      setTimeout(() => {
        window.open("https://visitrwanda.com/interests/", "_blank");
      }, 800);
    }
  };

  const handleViewAllHotels = () => {
    toast({
      title: "Redirecting...",
      description: "Taking you to view all hotel options",
    });
    setTimeout(() => {
      window.open("https://www.booking.com/searchresults.html?ss=Rwanda", "_blank");
    }, 800);
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

      <main className="p-3 sm:p-4 space-y-4 sm:space-y-6">
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
          <div className="relative z-10 p-4 sm:p-6 text-white">
            <h3 className="font-semibold text-base sm:text-lg mb-2">🇷🇼 Experience Rwanda</h3>
            <p className="text-xs sm:text-sm text-white/90 mb-3">
              From mountain gorillas to cultural heritage sites
            </p>
            <Badge className="bg-green-600 text-white text-xs">Featured</Badge>
          </div>
        </Card>

        {/* Curated Itineraries */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base sm:text-lg">Curated Itineraries</h2>
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm" onClick={handleViewAllItineraries}>View All</Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
            <Card className="min-w-[260px] sm:min-w-[280px] p-3 sm:p-4 bg-gradient-to-br from-primary/10 to-accent/5 cursor-pointer hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <Badge className="bg-primary text-primary-foreground text-xs">Popular</Badge>
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-2">3-Day Cultural Journey</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Kigali memorials, Inema Arts, Traditional dance</p>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-semibold text-primary">RWF 180,000</span>
                <Button
                  size="sm"
                  className="text-xs h-7 sm:h-8"
                  onClick={(e) => handleItineraryView("3-Day Cultural Journey", "https://visitrwanda.com/interests/cultural-heritage/", e)}
                >
                  View Details
                </Button>
              </div>
            </Card>
            <Card className="min-w-[260px] sm:min-w-[280px] p-3 sm:p-4 bg-gradient-to-br from-accent/10 to-primary/5 cursor-pointer hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                <Badge className="bg-accent text-accent-foreground text-xs">Weekend</Badge>
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-2">Lake Kivu Escape</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Boat tours, beach activities, local cuisine</p>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-semibold text-primary">RWF 120,000</span>
                <Button
                  size="sm"
                  className="text-xs h-7 sm:h-8"
                  onClick={(e) => handleItineraryView("Lake Kivu Escape", "https://visitrwanda.com/interests/lakes/", e)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Custom Itinerary Maker */}
        <Card className="p-3 sm:p-4 bg-gradient-to-r from-gold/10 to-gold/5 border-gold/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-gold flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Create Your Journey</h3>
                <p className="text-xs text-muted-foreground">Build a custom itinerary</p>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-gold text-gold-foreground hover:bg-gold/90 text-xs sm:text-sm w-full sm:w-auto"
              onClick={handleStartPlanning}
            >
              Start Planning
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="text-xs">Mix & Match</Badge>
            <Badge variant="outline" className="text-xs">Flexible Dates</Badge>
            <Badge variant="outline" className="text-xs">Expert Tips</Badge>
          </div>
        </Card>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap text-xs sm:text-sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Hotels Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base sm:text-lg">Featured Hotels</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs sm:text-sm"
              onClick={handleViewAllHotels}
            >
              View All
            </Button>
          </div>
          <div className="grid gap-3 sm:gap-4">
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="flex flex-col sm:flex-row">
                  {/* Hotel Image */}
                  <div className="w-full sm:w-32 h-40 sm:h-auto sm:flex-shrink-0 overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Hotel Info */}
                  <div className="flex-1 p-3 sm:p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm sm:text-base flex-1">{hotel.name}</h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-gold text-gold" />
                        <span className="text-xs sm:text-sm font-medium">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{hotel.location}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{hotel.amenities}</p>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="font-semibold text-primary text-xs sm:text-sm">{hotel.price}/night</span>
                      <Button
                        size="sm"
                        className="h-7 sm:h-8 text-xs px-2 sm:px-3"
                        onClick={(e) => handleHotelBooking(hotel, e)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">Book Now</span>
                        <span className="sm:hidden">Book</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="space-y-4" data-section="experiences">
          <h2 className="font-semibold text-base sm:text-lg">
            {filteredExperiences.length === experiences.length
              ? "Popular Experiences"
              : `Found ${filteredExperiences.length} experience${filteredExperiences.length !== 1 ? 's' : ''}`}
          </h2>
          {filteredExperiences.length === 0 ? (
            <Card className="p-6 sm:p-8 text-center">
              <p className="text-muted-foreground text-sm sm:text-base">No experiences found. Try a different search or category.</p>
            </Card>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {filteredExperiences.map((experience, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
                    {/* Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
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
                    <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-2">{experience.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {experience.category}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 flex-shrink-0" />
                          <span className="whitespace-nowrap">{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-gold text-gold flex-shrink-0" />
                          <span className="font-medium">{experience.rating}</span>
                          <span>({experience.reviews})</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="font-semibold text-primary text-xs sm:text-sm">{experience.price}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 sm:h-8 text-xs px-2 sm:px-3 flex-shrink-0"
                          onClick={(e) => handleBooking(experience, e)}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">Book Now</span>
                          <span className="sm:hidden">Book</span>
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
