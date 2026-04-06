"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { Property } from "@/types";
import { Button } from "@/components/ui/button";
import { Filter, X, ChevronDown, SlidersHorizontal } from "lucide-react";

interface PropertyGridProps {
  properties: Property[];
  initialCategory?: string;
}

export function PropertyGrid({ properties, initialCategory = "All" }: PropertyGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [sortOrder, setSortOrder] = useState<string>("Newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [minBeds, setMinBeds] = useState<number>(0);
  const [minBaths, setMinBaths] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryCategory = searchParams.get("category");
    if (queryCategory && categories.includes(queryCategory)) {
      setActiveCategory(queryCategory);
    }
  }, [searchParams]);

  const categories = ["All", "Luxury", "Rentals", "Self-contained", "Residential"];

  const filteredProperties = properties.filter(p => {
    // Category Filter
    const categoryMatch = activeCategory === "All" 
      || (activeCategory === "Rentals" && p.listingType === "Rent")
      || (activeCategory === "Self-contained" && p.isSelfContained)
      || p.category === activeCategory;

    if (!categoryMatch) return false;

    // Granular Filters
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (p.beds < minBeds) return false;
    if (p.baths < minBaths) return false;

    return true;
  }).sort((a, b) => {
    if (sortOrder === "Price: Low to High") return a.price - b.price;
    if (sortOrder === "Price: High to Low") return b.price - a.price;
    if (sortOrder === "Featured") {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
    }
    // Newest fallback
    return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div className="sticky top-[4rem] z-40 w-full bg-background/80 backdrop-blur-xl border-b border-border/40 mb-8 py-2">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1 py-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  className={`rounded-full shrink-0 transition-all text-xs h-9 ${
                    activeCategory === cat 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "bg-white border-border/50 hover:bg-slate-50 text-foreground"
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-2 md:pt-0">
               <Button 
                variant="outline" 
                size="sm" 
                className={`rounded-xl gap-2 font-semibold h-9 ${showFilters ? 'bg-primary/5 border-primary/20 text-primary' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
               >
                 <SlidersHorizontal className="h-4 w-4" />
                 Filters
                 { (minBeds > 0 || minBaths > 0 || priceRange[0] > 0 || priceRange[1] < 10000000) && (
                   <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                 )}
               </Button>
               
               <div className="h-4 w-px bg-border mx-1 hidden md:block"></div>

               <select 
                className="bg-transparent text-xs font-bold focus:ring-0 cursor-pointer h-9 px-2 border-none ring-0 focus:outline-none"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="Newest">Sort: Newest</option>
                <option value="Featured">Sort: Featured</option>
                <option value="Price: Low to High">Price: Low+</option>
                <option value="Price: High to Low">Price: High-</option>
              </select>
            </div>
          </div>

          {/* Expanded Filters Panel */}
          {showFilters && (
            <div className="py-6 mt-2 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-border/40 animate-in fade-in slide-in-from-top-4 duration-300">
               <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price Range</label>
                  <div className="flex items-center gap-2">
                     <input 
                      type="number" 
                      placeholder="Min" 
                      className="w-full h-10 rounded-xl border border-border bg-white p-3 text-xs focus:ring-1 focus:ring-primary outline-none"
                      onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                     />
                     <span className="text-muted-foreground">-</span>
                     <input 
                      type="number" 
                      placeholder="Max" 
                      className="w-full h-10 rounded-xl border border-border bg-white p-3 text-xs focus:ring-1 focus:ring-primary outline-none"
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 10000000])}
                     />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Min Bedrooms</label>
                  <div className="flex gap-2">
                     {[0, 1, 2, 3, 4, 5].map(nu => (
                       <button 
                        key={nu}
                        onClick={() => setMinBeds(nu)}
                        className={`h-9 w-9 rounded-lg border text-xs font-bold transition-all ${minBeds === nu ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-border hover:border-primary/40'}`}
                       >
                         {nu === 0 ? 'Any' : `${nu}+`}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Min Bathrooms</label>
                  <div className="flex gap-2">
                     {[0, 1, 2, 3, 4].map(nu => (
                       <button 
                        key={nu}
                        onClick={() => setMinBaths(nu)}
                        className={`h-9 w-9 rounded-lg border text-xs font-bold transition-all ${minBaths === nu ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-border hover:border-primary/40'}`}
                       >
                         {nu === 0 ? 'Any' : `${nu}+`}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="flex items-end pb-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-muted-foreground hover:text-red-500 gap-1.5"
                    onClick={() => {
                      setMinBeds(0);
                      setMinBaths(0);
                      setPriceRange([0, 10000000]);
                    }}
                  >
                    <X className="h-3 w-3" />
                    Reset all filters
                  </Button>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Real Estate in View</h2>
            <p className="text-muted-foreground text-sm mt-1">{filteredProperties.length} homes available</p>
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="text-lg font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground">Try adjusting your category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
