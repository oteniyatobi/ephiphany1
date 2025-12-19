import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ApiService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Ticket, CheckCircle2 } from "lucide-react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: {
        id: string;
        title: string;
        price: string | number;
        category?: string;
        date?: string;
    };
    type: 'event' | 'experience';
}

const BookingModal = ({ isOpen, onClose, item, type }: BookingModalProps) => {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user } = useAuth();
    const { toast } = useToast();

    // Helper to parse price string to number "RWF 5,000" -> 5000
    const parsePrice = (priceStr: string | number) => {
        if (typeof priceStr === 'number') return priceStr;
        if (!priceStr || priceStr === 'Free') return 0;
        return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
    };

    const unitPrice = parsePrice(item.price);
    const total = unitPrice * quantity;

    const handleBooking = async () => {
        if (!user) {
            toast({
                title: "Login Required",
                description: "Please login to book tickets.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const bookingData = {
                userId: user.id,
                itemId: item.id,
                itemTitle: item.title,
                date: item.date || new Date().toISOString(),
                quantity,
                totalPrice: total,
                category: type === 'event' ? 'Event' : 'Experience'
            };

            await ApiService.createBooking(bookingData);
            setSuccess(true);
            toast({
                title: "Booking Confirmed!",
                description: `You have successfully booked ${quantity} ticket(s).`,
                className: "bg-green-500 text-white",
            });

            setTimeout(() => {
                setSuccess(false);
                setQuantity(1);
                onClose();
            }, 2000);

        } catch (error) {
            toast({
                title: "Booking Failed",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                {!success ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Book {type === 'event' ? 'Tickets' : 'Experience'}</DialogTitle>
                            <DialogDescription>
                                {item.title} • {item.date ? item.date : ''}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="quantity" className="text-right">
                                    Quantity
                                </Label>
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </Button>
                                    <span className="w-8 text-center">{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                                <span>Total</span>
                                <span>{item.price === 'Free' ? 'Free' : `RWF ${total.toLocaleString()}`}</span>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="secondary" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" onClick={handleBooking} disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Ticket className="mr-2 h-4 w-4" />}
                                Confirm Booking
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold">Booking Successful!</h3>
                        <p className="text-muted-foreground">Your ticket has been confirmed.</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
