import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Award, Star, TrendingUp, ExternalLink, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import AppHeader from "@/components/AppHeader";
import { useToast } from "@/hooks/use-toast";
import { products as mockProducts } from "@/data/mockData";
import { handleExternalLink } from "@/utils/linkHandler";
import { apiService } from "@/services/api";
import aziziLife from "@/assets/azizi-life.jpg";
import hagariRwanda from "@/assets/hagari-rwanda.jpg";
import imigongoArt from "@/assets/imigongo-art.jpg";

const Marketplace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const data = await apiService.getProducts();
      // Combine with mock if backend is empty for better demo, or just use backend
      setProducts(data.length > 0 ? data : mockProducts);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const handlePurchase = (product: any, e?: React.MouseEvent) => {
    handleExternalLink(product.purchaseUrl, `Buying ${product.name}`, e);
  };

  const handleViewMakerShop = (e?: React.MouseEvent) => {
    handleExternalLink("https://www.shopin.rw/", "Visiting Maker Shop", e);
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
        <div className="flex flex-col gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-gold hover:bg-gold/90 text-gold-foreground gap-2"
            onClick={() => navigate('/sell')}
          >
            <Plus className="h-4 w-4" />
            Sell Your Product
          </Button>
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
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7"
                  onClick={handleViewMakerShop}
                >
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
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              {filteredProducts.length === products.length
                ? "Local Products"
                : `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => navigate('/my-ads')}
            >
              My Ads
            </Button>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
              <p>Fetching amazing products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
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
