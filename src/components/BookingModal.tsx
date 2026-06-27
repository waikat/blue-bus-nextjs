"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Lock, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  productId?: string;
}

export default function BookingModal({
  open,
  onOpenChange,
  title = "Book Your Experience",
  productId = "g370000000b0000000c022b3d",
}: BookingModalProps) {
  const [loading, setLoading] = useState(true);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setLoading(true);
      }}
    >
      <DialogContent className="max-w-5xl h-[90vh] p-0 flex flex-col overflow-hidden rounded-none border-2 border-foreground/20">

        {/* Header — DialogTitle fixes the screen reader warning */}
        <div className="px-6 py-4 border-b-2 border-foreground/20 bg-card shrink-0">
          <DialogTitle className="text-2xl font-display font-black uppercase tracking-tighter">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Book your kiteboarding lesson or rental at Kiteboarding Bonaire via our secure booking system.
          </DialogDescription>
        </div>

        {/* Booking iframe */}
        <div className="relative flex-1 min-h-0 bg-card">
          {loading && (
            <div className="absolute inset-0 z-10">
              <Skeleton className="w-full h-full rounded-none" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <p className="text-sm text-muted-foreground font-body animate-pulse uppercase tracking-wider">
                  Loading booking system...
                </p>
              </div>
            </div>
          )}
          <iframe
            src={`https://app.vikingbookings.com/widget/booking/${productId}`}
            className="w-full h-full border-0"
            title={title}
            loading="lazy"
            allow="payment; geolocation"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-modals"
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t-2 border-foreground/20 bg-muted flex justify-center gap-8 text-sm text-muted-foreground font-body shrink-0 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            Secure SSL
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3 h-3" />
            Instant Confirmation
          </span>
        </div>

      </DialogContent>
    </Dialog>
  );
}
