import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Award, Star, TrendingUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import { useToast } from "@/hooks/use-toast";
import aziziLife from "@/assets/azizi-life.jpg";
import hagariRwanda from "@/assets/hagari-rwanda.jpg";
import imigongoArt from "@/assets/imigongo-art.jpg";
import akageraCoffee from "@/assets/akagera-coffee.jpg";
import kitengeFabric from "@/assets/kitenge-fabric.jpg";
import woodenSculpture from "@/assets/wooden-sculpture.jpg";
import rwandaHoney from "@/assets/rwanda-honey.jpg";

const Marketplace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const products = [
    {
      id: "prod-1",
      name: "Hagari Rwanda Basket",
      category: "Handcrafts",
      price: "RWF 15,000",
      seller: "Hagari Rwanda",
      image: hagariRwanda,
      description: "Beautiful handwoven traditional Rwandan basket made from natural fibers. Perfect for home decoration or as a gift.",
      purchaseUrl: "https://shopin.rw/search?q=hagari+basket",
    },
    {
      id: "prod-2",
      name: "Imigongo Art Piece",
      category: "Art",
      price: "RWF 50,000",
      seller: "Rwanda Heritage",
      image: imigongoArt,
      description: "Authentic Imigongo art featuring traditional geometric patterns. Handcrafted using cow dung and natural pigments, representing Rwanda's unique artistic heritage.",
      purchaseUrl: "https://isoko.rw/search?q=imigongo+art",
    },
    {
      id: "prod-3",
      name: "Rwanda Coffee Beans (1kg)",
      category: "Food & Beverage",
      price: "RWF 8,000",
      seller: "Akagera Coffee",
      image: akageraCoffee,
      description: "Premium Rwandan coffee beans from the Akagera region. Known for their smooth, rich flavor with notes of citrus and chocolate. Perfect for coffee enthusiasts.",
      purchaseUrl: "https://shopin.rw/search?q=rwanda+coffee",
    },
    {
      id: "prod-4",
      name: "Kitenge Fabric (2m)",
      category: "Textiles",
      price: "RWF 20,000",
      seller: "Fashion Rwanda",
      image: kitengeFabric,
      description: "Vibrant Kitenge fabric featuring traditional African patterns. Perfect for making clothing, accessories, or home décor. High-quality cotton blend.",
      purchaseUrl: "https://isoko.rw/search?q=kitenge+fabric",
    },
    {
      id: "prod-5",
      name: "Wooden Sculpture",
      category: "Handcrafts",
      price: "RWF 35,000",
      seller: "Azizi Life",
      image: woodenSculpture,
      description: "Hand-carved wooden sculpture showcasing traditional Rwandan craftsmanship. Made from sustainably sourced local wood, each piece is unique.",
      purchaseUrl: "https://shopin.rw/search?q=wooden+sculpture",
    },
    {
      id: "prod-6",
      name: "Pure Rwanda Honey (500g)",
      category: "Food & Beverage",
      price: "RWF 6,000",
      seller: "Pure Rwanda",
      image: rwandaHoney,
      description: "100% pure, raw honey harvested from Rwanda's pristine forests. Rich in flavor and natural enzymes. Unprocessed and unfiltered for maximum health benefits.",
      purchaseUrl: "https://isoko.rw/search?q=rwanda+honey",
    },
    {
      id: "prod-7",
      name: "Rwanda Tea Premium Blend",
      category: "Food & Beverage",
      price: "RWF 12,000",
      seller: "Rwanda Tea Company",
      image: akageraCoffee,
      description: "Premium black tea from Rwanda's high-altitude tea plantations. Known for its bright, brisk flavor and golden color. Perfect for morning or afternoon tea.",
      purchaseUrl: "https://shopin.rw/search?q=rwanda+tea",
    },
    {
      id: "prod-8",
      name: "Traditional Agaseke Basket",
      category: "Handcrafts",
      price: "RWF 25,000",
      seller: "Rwanda Crafts",
      image: hagariRwanda,
      description: "Traditional Agaseke basket, a symbol of Rwandan culture and unity. Handwoven by skilled artisans using traditional techniques passed down through generations.",
      purchaseUrl: "https://isoko.rw/search?q=agaseke+basket",
    },
    {
      id: "prod-9",
      name: "Rwanda Vanilla Beans (100g)",
      category: "Food & Beverage",
      price: "RWF 18,000",
      seller: "Rwanda Spices",
      image: rwandaHoney,
      description: "Premium vanilla beans from Rwanda. Rich, aromatic, and perfect for baking and cooking. Each bean is hand-selected for quality and flavor.",
      purchaseUrl: "https://shopin.rw/search?q=vanilla+beans",
    },
    {
      id: "prod-10",
      name: "Handwoven Rwandan Mat",
      category: "Textiles",
      price: "RWF 30,000",
      seller: "Rwanda Weavers",
      image: kitengeFabric,
      description: "Beautiful handwoven mat made from natural fibers. Durable and decorative, perfect for floor covering or wall hanging. Traditional Rwandan design.",
      purchaseUrl: "https://isoko.rw/search?q=handwoven+mat",
    },
    // Arts & Crafts - Traditional Items
    {
      id: "prod-11",
      name: "Traditional Agaseke Wedding Basket",
      category: "Handcrafts",
      price: "RWF 45,000",
      seller: "Imitako Arts & Crafts",
      image: hagariRwanda,
      description: "Exquisite Agaseke wedding basket, a symbol of unity and love in Rwandan culture. Handcrafted by skilled artisans using traditional techniques. Perfect for weddings or special occasions.",
      purchaseUrl: "https://imitakoarts.com/",
    },
    {
      id: "prod-12",
      name: "Handwoven Wall Basket Set",
      category: "Handcrafts",
      price: "RWF 35,000",
      seller: "Horizon Artistry",
      image: hagariRwanda,
      description: "Set of three beautifully handwoven wall baskets in varying sizes. Made from natural fibers with traditional Rwandan patterns. Perfect for adding cultural flair to your home décor.",
      purchaseUrl: "https://horizonartistry.com/",
    },
    {
      id: "prod-13",
      name: "Banana Fiber Decorative Bowl",
      category: "Handcrafts",
      price: "RWF 22,000",
      seller: "Rwanda Action Craft Shop",
      image: woodenSculpture,
      description: "Eco-friendly decorative bowl made from banana fiber. Handcrafted by women cooperatives, this sustainable piece adds natural beauty to any space while supporting local communities.",
      purchaseUrl: "https://www.rwanda-action.org/shop/",
    },
    {
      id: "prod-14",
      name: "Traditional Woven Tableware Set",
      category: "Handcrafts",
      price: "RWF 40,000",
      seller: "Horizon Artistry",
      image: hagariRwanda,
      description: "Complete tableware set including placemats, coasters, and serving trays. Handwoven with traditional patterns, perfect for elegant dining or as decorative pieces.",
      purchaseUrl: "https://horizonartistry.com/",
    },
    {
      id: "prod-15",
      name: "Handwoven Storage Basket",
      category: "Handcrafts",
      price: "RWF 28,000",
      seller: "Baraza Boutique",
      image: hagariRwanda,
      description: "Functional and beautiful storage basket made from natural fibers. Durable construction with traditional Rwandan weaving patterns. Ideal for organizing or as a decorative element.",
      purchaseUrl: "https://www.barazacollective.com/copy-of-boutique",
    },
    // Arts & Crafts - Art Pieces
    {
      id: "prod-16",
      name: "Contemporary Rwandan Painting",
      category: "Art",
      price: "RWF 120,000",
      seller: "Bwiza Art Gallery",
      image: imigongoArt,
      description: "Stunning contemporary painting by a local Rwandan artist. Captures modern Rwanda with vibrant colors and expressive brushwork. Framed and ready to hang.",
      purchaseUrl: "https://bwizaart.com/",
    },
    {
      id: "prod-17",
      name: "Mixed Media Artwork",
      category: "Art",
      price: "RWF 95,000",
      seller: "Envision Rwanda Gallery",
      image: imigongoArt,
      description: "Innovative mixed media artwork combining traditional and contemporary techniques. Features collage, paint, and found materials creating a unique visual narrative of Rwanda.",
      purchaseUrl: "https://www.envisionrwanda.com/the-gallery",
    },
    {
      id: "prod-18",
      name: "Traditional Imigongo Wall Art",
      category: "Art",
      price: "RWF 75,000",
      seller: "Inema Arts Center",
      image: imigongoArt,
      description: "Authentic Imigongo art piece featuring traditional geometric patterns. Created using the ancient technique of cow dung and natural pigments. A true piece of Rwandan heritage.",
      purchaseUrl: "https://www.inemaarts.com/",
    },
    {
      id: "prod-19",
      name: "Rwandan Portrait Painting",
      category: "Art",
      price: "RWF 85,000",
      seller: "Bwiza Art Gallery",
      image: imigongoArt,
      description: "Beautiful portrait painting capturing the essence of Rwandan people. Rich colors and detailed brushwork showcase the artist's skill and cultural sensitivity.",
      purchaseUrl: "https://bwizaart.com/",
    },
    {
      id: "prod-20",
      name: "Cultural Scene Canvas Art",
      category: "Art",
      price: "RWF 110,000",
      seller: "Heaven Rwanda Gallery",
      image: imigongoArt,
      description: "Large canvas painting depicting traditional Rwandan cultural scenes. Vibrant colors and dynamic composition bring daily life and celebrations to life.",
      purchaseUrl: "https://heavenrwanda.com/retail/",
    },
    // Arts & Crafts - Sculptures & Carvings
    {
      id: "prod-21",
      name: "Hand-Carved Wooden Mask",
      category: "Handcrafts",
      price: "RWF 55,000",
      seller: "Xtreative Market",
      image: woodenSculpture,
      description: "Intricately hand-carved wooden mask featuring traditional African designs. Made from sustainably sourced local wood. Each piece is unique and showcases master craftsmanship.",
      purchaseUrl: "https://xtreative.com/",
    },
    {
      id: "prod-22",
      name: "Traditional Wooden Statue",
      category: "Handcrafts",
      price: "RWF 65,000",
      seller: "Xtreative Market",
      image: woodenSculpture,
      description: "Beautiful hand-carved wooden statue representing traditional Rwandan culture. Smooth finish and detailed workmanship make this a stunning decorative piece.",
      purchaseUrl: "https://xtreative.com/",
    },
    {
      id: "prod-23",
      name: "Stone Carved Sculpture",
      category: "Art",
      price: "RWF 90,000",
      seller: "Inema Arts Center",
      image: woodenSculpture,
      description: "Elegant stone sculpture carved by local artists. Features abstract forms inspired by Rwandan landscapes and culture. A statement piece for any art collection.",
      purchaseUrl: "https://www.inemaarts.com/",
    },
    {
      id: "prod-24",
      name: "Ceramic Vase with Rwandan Patterns",
      category: "Handcrafts",
      price: "RWF 38,000",
      seller: "Yao Craft",
      image: woodenSculpture,
      description: "Handcrafted ceramic vase decorated with traditional Rwandan geometric patterns. Glazed finish and unique design make it perfect for flowers or as standalone décor.",
      purchaseUrl: "https://yaocraft.com/",
    },
    // Arts & Crafts - Jewelry & Accessories
    {
      id: "prod-25",
      name: "Handmade Beaded Necklace",
      category: "Jewelry",
      price: "RWF 18,000",
      seller: "Imitako Arts & Crafts",
      image: kitengeFabric,
      description: "Colorful beaded necklace handcrafted by local artisans. Features traditional patterns and vibrant colors. Adjustable length, perfect for any occasion.",
      purchaseUrl: "https://imitakoarts.com/",
    },
    {
      id: "prod-26",
      name: "Traditional Rwandan Earrings",
      category: "Jewelry",
      price: "RWF 15,000",
      seller: "Horizon Artistry",
      image: kitengeFabric,
      description: "Elegant traditional earrings featuring intricate beadwork and metalwork. Lightweight and comfortable, showcasing Rwandan craftsmanship and style.",
      purchaseUrl: "https://horizonartistry.com/",
    },
    {
      id: "prod-27",
      name: "Kitenge Fabric Handbag",
      category: "Textiles",
      price: "RWF 32,000",
      seller: "Fashion Rwanda",
      image: kitengeFabric,
      description: "Stylish handbag made from vibrant Kitenge fabric. Features multiple compartments, sturdy handles, and traditional African patterns. Perfect for everyday use.",
      purchaseUrl: "https://isoko.rw/search?q=kitenge+handbag",
    },
    {
      id: "prod-28",
      name: "Handwoven Clutch Purse",
      category: "Textiles",
      price: "RWF 25,000",
      seller: "Baraza Boutique",
      image: kitengeFabric,
      description: "Elegant clutch purse handwoven from natural fibers. Compact design with traditional patterns. Perfect for evening events or special occasions.",
      purchaseUrl: "https://www.barazacollective.com/copy-of-boutique",
    },
    {
      id: "prod-29",
      name: "Traditional Rwandan Bracelet Set",
      category: "Jewelry",
      price: "RWF 20,000",
      seller: "Xtreative Market",
      image: kitengeFabric,
      description: "Set of three matching bracelets featuring traditional Rwandan designs. Handcrafted with beads and natural materials. Stackable or wear individually.",
      purchaseUrl: "https://xtreative.com/",
    },
    // Arts & Crafts - Home Décor
    {
      id: "prod-30",
      name: "Woven Wall Hanging",
      category: "Handcrafts",
      price: "RWF 42,000",
      seller: "Horizon Artistry",
      image: hagariRwanda,
      description: "Large decorative wall hanging featuring traditional Rwandan weaving patterns. Made from natural fibers, adds warmth and cultural character to any room.",
      purchaseUrl: "https://horizonartistry.com/",
    },
    {
      id: "prod-31",
      name: "Decorative Tray with Rwandan Patterns",
      category: "Handcrafts",
      price: "RWF 30,000",
      seller: "Horizon Artistry",
      image: hagariRwanda,
      description: "Beautiful handwoven tray decorated with traditional geometric patterns. Perfect for serving or as a decorative centerpiece. Durable and easy to clean.",
      purchaseUrl: "https://horizonartistry.com/",
    },
    {
      id: "prod-32",
      name: "Traditional Rwandan Pottery",
      category: "Handcrafts",
      price: "RWF 35,000",
      seller: "Yao Craft",
      image: woodenSculpture,
      description: "Handcrafted pottery piece featuring traditional Rwandan designs. Made using age-old techniques, each piece is unique and functional. Perfect for home décor.",
      purchaseUrl: "https://yaocraft.com/",
    },
    {
      id: "prod-33",
      name: "Handwoven Placemat Set (6 pieces)",
      category: "Textiles",
      price: "RWF 28,000",
      seller: "Baraza Boutique",
      image: kitengeFabric,
      description: "Set of six handwoven placemats with traditional patterns. Durable natural fibers, perfect for protecting your table while adding cultural elegance to meals.",
      purchaseUrl: "https://www.barazacollective.com/copy-of-boutique",
    },
    {
      id: "prod-34",
      name: "Rwandan Cultural Print Canvas",
      category: "Art",
      price: "RWF 60,000",
      seller: "Aliki Art",
      image: imigongoArt,
      description: "Vibrant canvas print featuring Rwandan cultural motifs and scenes. High-quality print on canvas, ready to frame. Celebrates Rwanda's rich heritage and traditions.",
      purchaseUrl: "https://art.aliki250.rw/",
    },
    {
      id: "prod-35",
      name: "Handmade Greeting Cards Set",
      category: "Handcrafts",
      price: "RWF 8,000",
      seller: "Rwanda Action Craft Shop",
      image: kitengeFabric,
      description: "Set of beautiful handmade greeting cards featuring Rwandan designs and patterns. Made by women cooperatives using recycled materials. Perfect for any occasion.",
      purchaseUrl: "https://www.rwanda-action.org/shop/",
    },
  ];

  const handlePurchase = (product: typeof products[0]) => {
    toast({
      title: "Redirecting...",
      description: `Taking you to ${product.seller} to complete your purchase`,
    });
    // Open in new tab
    window.open(product.purchaseUrl, "_blank");
  };

  const categories = [
    "All", "Handcrafts", "Art", "Food", "Textiles", "Jewelry", "Home Décor"
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title="Marketplace" subtitle="Support local businesses">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </AppHeader>

      <main className="p-4 space-y-6">
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

        {/* Maker Spotlight */}
        <Card className="p-5 bg-gradient-to-br from-gold/10 to-primary/5 border-gold/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gold/20 rounded-full">
              <Award className="h-6 w-6 text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Maker Spotlight</h3>
              <p className="text-sm text-muted-foreground">Supporting local artisans</p>
            </div>
            <Badge className="bg-gold text-gold-foreground">Featured</Badge>
          </div>
          
          <div className="space-y-3">
            <Card className="p-3 bg-background/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={aziziLife} 
                    alt="Azizi Life"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">Azizi Life</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-gold text-gold" />
                      <span>4.9</span>
                    </div>
                    <span>•</span>
                    <span>2,400+ sales</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-7">
                  View Shop
                </Button>
              </div>
            </Card>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src={hagariRwanda} 
                  alt="Hagari Rwanda"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src={imigongoArt} 
                  alt="Imigongo Art"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src={aziziLife} 
                  alt="Azizi Life Products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-primary" />
                <span>Top 3% of sellers this month</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Products Grid */}
        <div className="space-y-4">
          <h2 className="font-semibold">
            {filteredProducts.length === products.length 
              ? "Local Products" 
              : `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
          </h2>
          {filteredProducts.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No products found. Try a different search or category.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 space-y-2">
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{product.seller}</p>
                    {product.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary text-sm">{product.price}</span>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full h-8"
                    onClick={() => handlePurchase(product)}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Buy Now
                  </Button>
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

export default Marketplace;
