
import bkArena from "@/assets/bk-arena.jpg";
import amahoroStadium from "@/assets/amahoro-stadium.jpg";
import centuryCinema from "@/assets/century-cinema.jpg";
import genocideMemorial from "@/assets/genocide-memorial.jpg";
import nyamataMemorial from "@/assets/nyamata-memorial.jpg";
import volcanoesPark from "@/assets/volcanoes-park.jpg";
import lakeKivuTour from "@/assets/lake-kivu-tour.jpg";
import inemaArtsCenter from "@/assets/inema-arts-center.jpg";
import bugeseraLakeResort from "@/assets/bugesera-lake-resort.jpg";
import kigaliCity from "@/assets/kigali-city.jpg";
import kigaliHero from "@/assets/kigali-hero.jpg";
import aziziLife from "@/assets/azizi-life.jpg";
import hagariRwanda from "@/assets/hagari-rwanda.jpg";
import imigongoArt from "@/assets/imigongo-art.jpg";
import akageraCoffee from "@/assets/akagera-coffee.jpg";
import kitengeFabric from "@/assets/kitenge-fabric.jpg";
import woodenSculpture from "@/assets/wooden-sculpture.jpg";
import rwandaHoney from "@/assets/rwanda-honey.jpg";
import akageraSafari from "@/assets/akagera-safari.png";
import nyungweForest from "@/assets/nyungwe-forest.png";
import radissonBlu from "@/assets/radisson-blu.png";
import kigaliMarriott from "@/assets/kigali-marriott.png";
import milleCollines from "@/assets/mille-collines.png";
import oneAndOnlyNyungwe from "@/assets/one-and-only-nyungwe.png";

export const events = [
    {
        id: "event-4",
        title: "Gorilla FC vs Rayon Sports",
        category: "Sports",
        date: "Dec 19, 2025",
        time: "3:00 PM",
        venue: "Kigali Pelé Stadium",
        location: "Nyamirambo, Kigali",
        price: "RWF 5,000",
        image: amahoroStadium,
        featured: true,
        ticketsLeft: 1000,
        ticketUrl: "https://www.ferwafa.rw/",
    },
    {
        id: "event-7",
        title: "Kigali Impact Nights",
        category: "Concert",
        date: "Dec 26, 2025",
        time: "7:00 PM",
        venue: "Norrsken House",
        location: "Kigali",
        price: "Free",
        image: centuryCinema, // Using available image for generic venue
        featured: false,
        ticketsLeft: 100,
        ticketUrl: "https://www.norrsken.org/kigali",
    },
    {
        id: "event-8",
        title: "New Year's Eve Fireworks",
        category: "Festival",
        date: "Dec 31, 2025",
        time: "11:00 PM",
        venue: "Kigali Convention Centre",
        location: "Kacyiru, Kigali",
        price: "Free",
        image: kigaliCity,
        featured: true,
        ticketsLeft: 5000,
        ticketUrl: "https://www.kcc.rw/",
    },
    {
        id: "event-9",
        title: "East African Party 18",
        category: "Concert",
        date: "Jan 1, 2026",
        time: "6:00 PM",
        venue: "BK Arena",
        location: "Remera, Kigali",
        price: "From RWF 10,000",
        image: bkArena,
        featured: true,
        ticketsLeft: 2500,
        ticketUrl: "https://ticqet.rw/",
    },
    {
        id: "event-10",
        title: "Heroes Day Concert",
        category: "Concert",
        date: "Feb 1, 2026",
        time: "5:00 PM",
        venue: "Kigali Pelé Stadium",
        location: "Nyamirambo, Kigali",
        price: "RWF 5,000",
        image: amahoroStadium,
        featured: false,
        ticketsLeft: 3000,
        ticketUrl: "https://ticqet.rw/",
    }
];

export const experiences = [
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
        bookingUrl: "https://kgm.rw/visit",
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
        bookingUrl: "https://www.visitrwanda.com/interests/memorials/",
    },
    {
        id: "tour-3",
        title: "Volcanoes National Park - Gorilla Trekking",
        category: "Nature & Wildlife",
        duration: "Full Day",
        price: "RWF 2,000,000",
        rating: 5.0,
        reviews: 2100,
        image: volcanoesPark,
        location: "Musanze District",
        bookingUrl: "https://irembo.gov.rw/home/citizen/all_services",
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
        bookingUrl: "https://www.visitrwanda.com/interests/heritage-and-culture/",
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
        bookingUrl: "https://www.visitrwanda.com/interests/lakes/",
    },
    {
        id: "tour-6",
        title: "Akagera National Park Safari",
        category: "Nature & Wildlife",
        duration: "Full Day",
        price: "RWF 80,000",
        rating: 4.9,
        reviews: 1500,
        image: akageraSafari,
        location: "Eastern Province",
        bookingUrl: "https://visitakagera.org/visit-akagera/",
    },
    {
        id: "tour-7",
        title: "Nyungwe Forest Canopy Walk",
        category: "Adventure",
        duration: "3-4 hours",
        price: "RWF 80,000",
        rating: 4.8,
        reviews: 920,
        image: nyungweForest,
        location: "Nyungwe, Southern Province",
        bookingUrl: "https://www.visitnyungwe.org/",
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
    {
        id: "tour-10",
        title: "Nyungwe National Park - Chimpanzee Trekking",
        category: "Nature & Wildlife",
        duration: "Full Day",
        price: "RWF 90,000",
        rating: 4.9,
        reviews: 1100,
        image: nyungweForest,
        location: "Nyungwe, Southern Province",
        bookingUrl: "https://www.visitnyungwe.org/",
    },
    {
        id: "tour-11",
        title: "Golden Monkey Trekking",
        category: "Nature & Wildlife",
        duration: "Half Day",
        price: "RWF 135,000",
        rating: 4.8,
        reviews: 780,
        image: volcanoesPark,
        location: "Volcanoes National Park",
        bookingUrl: "https://visitrwanda.com/interests/gorilla-tracking/",
    },
];

export const products = [
    {
        id: "prod-1",
        name: "Rwanda Peace Basket (Agaseke)",
        category: "Handcrafts",
        price: "RWF 58,500",
        seller: "Etsy - African Artisans",
        image: "https://i.etsystatic.com/17076218/r/il/9c51c4/1740506279/il_600x600.1740506279_3q9r.jpg",
        description: "Authentic handwoven Rwandan peace basket made from sisal and sweetgrass. Traditional geometric patterns. Symbol of peace and unity.",
        purchaseUrl: "https://www.etsy.com/search?q=rwanda+peace+basket+agaseke",
    },
    {
        id: "prod-2",
        name: "Imigongo Wall Art",
        category: "Art",
        price: "RWF 110,500",
        seller: "Etsy - Rwanda Heritage",
        image: "https://i.etsystatic.com/23416105/r/il/ea4f6c/2586969177/il_600x600.2586969177_1h9m.jpg",
        description: "Authentic Rwandan Imigongo art on wood panel. Traditional geometric patterns in black & white. Handcrafted by women cooperatives.",
        purchaseUrl: "https://www.etsy.com/search?q=imigongo+art+rwanda",
    },
    {
        id: "prod-3",
        name: "Rwanda Single Origin Coffee",
        category: "Food & Beverage",
        price: "RWF 23,400",
        seller: "Amazon - Specialty Coffee",
        image: "https://m.media-amazon.com/images/I/71bGdE5ZKSL._SL1500_.jpg",
        description: "Premium Rwandan Arabica coffee beans. Bright citrus notes with chocolate undertones. Fair Trade certified.",
        purchaseUrl: "https://www.amazon.com/s?k=rwanda+coffee+beans",
    },
    {
        id: "prod-4",
        name: "Kitenge African Wax Print Fabric",
        category: "Textiles",
        price: "RWF 32,500",
        seller: "Etsy - African Fabrics",
        image: "https://i.etsystatic.com/18459655/r/il/f33e7c/3045929729/il_600x600.3045929729_qdxj.jpg",
        description: "Vibrant African wax print Kitenge fabric. 100% cotton, 6 yards. Perfect for clothing, decor, and crafts.",
        purchaseUrl: "https://www.etsy.com/search?q=kitenge+ankara+fabric",
    },
];

export const hotels = [
    { id: "hotel-1", name: "Radisson Blu Hotel Kigali", rating: 4.8, price: "RWF 380,000", amenities: "Pool • Spa • Restaurant", location: "Kacyiru, Kigali", bookingUrl: "https://www.booking.com/hotel/rw/radisson-blu-hotel-and-convention-center-kigali.html", image: radissonBlu },
    { id: "hotel-2", name: "Kigali Marriott Hotel", rating: 4.9, price: "RWF 340,000", amenities: "Gym • Bar • Conference", location: "Nyarugenge, Kigali", bookingUrl: "https://www.booking.com/hotel/rw/kigali-marriott.html", image: kigaliMarriott },
    { id: "hotel-3", name: "Kigali Serena Hotel", rating: 4.7, price: "RWF 175,000", amenities: "Garden • WiFi • Parking", location: "City Center, Kigali", bookingUrl: "https://www.booking.com/hotel/rw/kigali-serena.html", image: kigaliCity },
    { id: "hotel-4", name: "The Retreat Kigali", rating: 4.9, price: "RWF 600,000", amenities: "Spa • Restaurant • Pool", location: "Kacyiru, Kigali", bookingUrl: "https://www.booking.com/hotel/rw/the-retreat-kigali.html", image: kigaliHero },
    { id: "hotel-5", name: "Ubumwe Grand Hotel", rating: 4.6, price: "RWF 120,000", amenities: "Restaurant • WiFi • Parking", location: "City Center, Kigali", bookingUrl: "https://www.booking.com/hotel/rw/ubumwe-grand.html", image: kigaliCity },
    { id: "hotel-6", name: "Hotel des Mille Collines", rating: 4.5, price: "RWF 150,000", amenities: "Pool • Restaurant • Bar", location: "City Center, Kigali", bookingUrl: "https://www.booking.com/searchresults.html?ss=Hotel+des+Mille+Collines+Kigali", image: milleCollines },
    { id: "hotel-7", name: "Heaven Restaurant & Boutique Hotel", rating: 4.8, price: "RWF 140,000", amenities: "Restaurant • Garden • WiFi", location: "Kacyiru, Kigali", bookingUrl: "https://www.booking.com/searchresults.html?ss=Heaven+Restaurant+Boutique+Hotel+Kigali", image: kigaliCity },
    { id: "hotel-8", name: "Gorillas Volcanoes Hotel", rating: 4.7, price: "RWF 130,000", amenities: "Restaurant • WiFi • Parking", location: "Musanze District", bookingUrl: "https://www.booking.com/searchresults.html?ss=Gorillas+Volcanoes+Hotel+Musanze", image: volcanoesPark },
    { id: "hotel-9", name: "Lake Kivu Serena Hotel", rating: 4.6, price: "RWF 160,000", amenities: "Beach • Pool • Restaurant", location: "Karongi, Western Province", bookingUrl: "https://www.booking.com/searchresults.html?ss=Lake+Kivu+Serena+Hotel+Karongi", image: lakeKivuTour },
    { id: "hotel-10", name: "One&Only Nyungwe House", rating: 5.0, price: "RWF 350,000", amenities: "Luxury • Spa • Restaurant", location: "Nyungwe, Southern Province", bookingUrl: "https://www.booking.com/searchresults.html?ss=One+Only+Nyungwe+House", image: oneAndOnlyNyungwe },
];
