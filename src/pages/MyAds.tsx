import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Loader2, Trash2, ExternalLink, Package, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import BottomNav from "@/components/BottomNav";

const MyAds = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useAuth();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProducts = async () => {
            if (!user) return;
            setIsLoading(true);
            try {
                const data = await apiService.getUserProducts(user.id);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching user products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserProducts();
    }, [user]);

    const handleDelete = async (productId: string) => {
        if (!confirm("Are you sure you want to delete this listing?")) return;

        setIsDeleting(productId);
        try {
            const result = await apiService.deleteProduct(productId);
            if (result.success) {
                setProducts(products.filter(p => p.id !== productId));
                toast({ title: "Deleted", description: "Your listing has been removed." });
            } else {
                toast({ title: "Error", description: "Failed to delete listing.", variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <header className="p-4 border-b flex items-center gap-3 bg-white sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold">My Ads</h1>
            </header>

            <main className="p-4">
                {!user ? (
                    <Card className="p-8 text-center flex flex-col items-center gap-4">
                        <AlertCircle className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">Please log in to view your ads.</p>
                        <Button onClick={() => navigate('/login')}>Login Now</Button>
                    </Card>
                ) : isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                        <p>Loading your listings...</p>
                    </div>
                ) : products.length === 0 ? (
                    <Card className="p-12 text-center flex flex-col items-center gap-4 border-dashed">
                        <Package className="h-16 w-16 text-muted-foreground opacity-20" />
                        <h2 className="text-xl font-semibold">No active ads</h2>
                        <p className="text-muted-foreground">You haven't listed any products yet.</p>
                        <Button className="mt-2 bg-gold text-gold-foreground hover:bg-gold/90" onClick={() => navigate('/sell')}>
                            Start Selling
                        </Button>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {products.map((product) => (
                            <Card key={product.id} className="overflow-hidden flex gap-3 p-3">
                                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between min-w-0">
                                    <div>
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                                            <Badge variant="secondary" className="text-[10px] shrink-0">{product.category}</Badge>
                                        </div>
                                        <p className="font-bold text-primary mt-1">{product.price}</p>
                                        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1 italic">
                                            Listed on {new Date(product.createdAt || Date.now()).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 h-8 text-xs gap-1"
                                            onClick={() => navigate('/marketplace')}
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            View
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex-1 h-8 text-xs gap-1"
                                            onClick={() => handleDelete(product.id)}
                                            disabled={isDeleting === product.id}
                                        >
                                            {isDeleting === product.id ? (
                                                <Loader2 className="h-3 w-3 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-3 w-3" />
                                            )}
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
};

export default MyAds;
