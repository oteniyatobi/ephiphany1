import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ChevronLeft, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import BottomNav from "@/components/BottomNav";

const SellProduct = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
        image: "https://images.unsplash.com/photo-1544923246-77307dd654ca?w=800&auto=format&fit=crop&q=60", // Default or user-provided URL
        seller: user?.name || "Member",
        vendorId: user?.id || "",
        purchaseUrl: "" // In a real app, this might be a checkout link or contact info
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({ title: "Error", description: "You must be logged in to sell products.", variant: "destructive" });
            return;
        }

        if (!formData.name || !formData.category || !formData.price) {
            toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);
        try {
            // Ensure vendorId and seller are up to date
            const finalData = {
                ...formData,
                vendorId: user.id,
                seller: user.name,
                price: formData.price.startsWith('RWF') ? formData.price : `RWF ${formData.price}`
            };

            const result = await apiService.createProduct(finalData);
            if (result.id) {
                toast({ title: "Success!", description: "Your product has been listed." });
                navigate('/marketplace');
            } else {
                toast({ title: "Error", description: "Failed to list product.", variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <header className="p-4 border-b flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold">Sell Product</h1>
            </header>

            <main className="p-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Photo Upload Simulation */}
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-xl p-8 bg-muted/30">
                        <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-4">Add product photos</p>
                        <Button type="button" variant="outline" size="sm" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Image
                        </Button>
                        <p className="text-[10px] text-muted-foreground mt-2">Maximum 5 photos. JPG, PNG accepted.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Traditional Agaseke Basket"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select onValueChange={(val) => setFormData({ ...formData, category: val })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Handcrafts">Handcrafts</SelectItem>
                                    <SelectItem value="Art">Art</SelectItem>
                                    <SelectItem value="Food">Food & Beverage</SelectItem>
                                    <SelectItem value="Textiles">Textiles</SelectItem>
                                    <SelectItem value="Jewelry">Jewelry</SelectItem>
                                    <SelectItem value="Home Décor">Home Décor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price (RWF) *</Label>
                            <Input
                                id="price"
                                placeholder="e.g. 15,000"
                                type="text"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe what makes your product unique..."
                                className="min-h-[120px]"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="purchaseUrl">External Link (Optional)</Label>
                            <Input
                                id="purchaseUrl"
                                placeholder="https://yourawesomecraft.com"
                                value={formData.purchaseUrl}
                                onChange={(e) => setFormData({ ...formData, purchaseUrl: e.target.value })}
                            />
                            <p className="text-[10px] text-muted-foreground">Link to your website, Etsy, or WhatsApp me link.</p>
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-gold-foreground h-12 text-lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Posting...
                            </>
                        ) : (
                            "List Product"
                        )}
                    </Button>
                </form>
            </main>

            <BottomNav />
        </div>
    );
};

export default SellProduct;
