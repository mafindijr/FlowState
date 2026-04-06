"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Bed, Bath, Move } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Property } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const formattedPrice = property.listingType === "Rent"
    ? `₦${property.price.toLocaleString()}/mo`
    : `₦${property.price.toLocaleString()}`;

  const getStatusLabel = () => {
    if (property.status === "Sold") return "Sold Out";
    if (property.status === "Rented") return "Rented";
    if (property.status === "Pending") return "Under Offer";
    return null;
  };

  const statusLabel = getStatusLabel();

  return (
    <motion.div
      className="group relative flex flex-col rounded-2xl bg-card overflow-hidden border border-border/40 hover:shadow-xl transition-all duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={`/explore/${property.slug}`} className="absolute inset-0 z-0">
        <span className="sr-only">View Property Details</span>
      </Link>

      {/* Image Container with Hover Zoom */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <motion.div
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          <Badge className="bg-white/95 text-foreground hover:bg-white backdrop-blur-md border-none shadow-sm font-bold px-3 py-1 text-sm">
            {formattedPrice}
          </Badge>
          {statusLabel && (
            <Badge className={`backdrop-blur-md border-none shadow-sm font-bold px-3 py-1 text-sm ${
              property.status === 'Sold' || property.status === 'Rented' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'
            }`}>
              {statusLabel}
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 items-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full bg-white/90 hover:bg-white backdrop-blur-md shadow-sm z-20"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
          </Button>
          
          {property.isSelfContained && (
            <Badge className="bg-primary/90 hover:bg-primary text-white backdrop-blur-md border-none shadow-sm mt-1">
              Self-contained
            </Badge>
          )}
          {property.category === "Luxury" && (
            <Badge className="bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md border-none shadow-sm mt-1">
              Luxury
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3 pointer-events-none">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center text-muted-foreground text-sm gap-1.5 truncate">
            <MapPin className="h-4 w-4 shrink-0 text-primary/70" />
            <span className="truncate">{property.address}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-foreground mt-auto pt-4 border-t border-border/50">
          {property.beds > 0 && (
            <div className="flex items-center gap-1.5 font-medium">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span>{property.beds} <span className="hidden sm:inline-block">Beds</span></span>
            </div>
          )}
          {property.baths > 0 && (
            <div className="flex items-center gap-1.5 font-medium">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span>{property.baths} <span className="hidden sm:inline-block">Baths</span></span>
            </div>
          )}
          {property.sqft > 0 && (
            <div className="flex items-center gap-1.5 font-medium border-l pl-3 ml-1 border-border/50">
              <Move className="h-4 w-4 text-muted-foreground" />
              <span>{property.sqft.toLocaleString()} <span className="text-xs">sqft</span></span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
