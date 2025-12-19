import { toast } from "@/hooks/use-toast";

/**
 * Safely opens an external URL in a new tab.
 * Handles missing URLs and stops event propagation.
 * 
 * @param url - The URL to open
 * @param title - Optional title for the toast notification
 * @param e - Optional event to stop propagation
 */
export const handleExternalLink = (url: string | undefined, title: string = "Redirecting...", e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (!url) {
        toast({
            title: "Info Only",
            description: "No direct online booking available. Please visit the venue.",
            variant: "default",
        });
        return;
    }

    toast({
        title: title,
        description: "Opening in a new tab...",
    });

    // Open immediately to prevent popup blockers
    window.open(url, "_blank");
};
