import { getPropertyBySlug } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { MapPin, Bed, Bath, Move, CheckCircle2, Share, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate SEO Metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const property = await getPropertyBySlug(resolvedParams.slug);
  
  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.title} | FlowState`,
    description: `Stunning ${property.category} property located at ${property.address}. Discover premium real estate with FlowState.`,
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const property = await getPropertyBySlug(resolvedParams.slug);

  if (!property) {
    notFound();
  }

  const formattedPrice = property.listingType === "Rent"
    ? `$${property.price.toLocaleString()}/mo`
    : `$${property.price.toLocaleString()}`;

  return (
    <div className="flex-1 bg-white">
      {/* High-res Hero Gallery Placeholder */}
      <div className="w-full h-[50vh] md:h-[65vh] relative bg-slate-100 group">
        <Image 
          src={property.imageUrl}
          alt={property.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>
        <div className="absolute top-6 left-6 flex gap-2">
           <Button variant="secondary" className="rounded-full bg-white/90 backdrop-blur-md font-semibold hidden md:flex hover:bg-white text-sm">
             View 24 Photos
           </Button>
        </div>
        <div className="absolute top-6 right-6 flex gap-2">
           <Button variant="secondary" size="icon" className="rounded-full bg-white/90 backdrop-blur-md font-semibold hover:bg-white text-sm">
             <Share className="h-4 w-4" />
           </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl pt-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3 space-y-8">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-primary hover:bg-primary/90 text-white font-medium border-none">
                  {property.listingType === "Sale" ? "For Sale" : "For Rent"}
                </Badge>
                {property.status !== "Available" && (
                  <Badge className={`${
                    property.status === 'Sold' || property.status === 'Rented' ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'
                  } text-white font-medium border-none`}>
                    {property.status === "Sold" ? "Sold Out" : property.status === "Rented" ? "Rented" : "Under Offer"}
                  </Badge>
                )}
                {property.isSelfContained && (
                  <Badge className="bg-teal-500 hover:bg-teal-600 text-white font-medium border-none">
                    Self-contained
                  </Badge>
                )}
                {property.category === "Luxury" && (
                  <Badge className="bg-slate-900 text-white font-medium border-none">
                    Luxury
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-muted-foreground gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                {property.address}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-border">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bed className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-xl leading-none">{property.beds}</p>
                  <p className="text-sm text-muted-foreground">Beds</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bath className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-xl leading-none">{property.baths}</p>
                  <p className="text-sm text-muted-foreground">Baths</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Move className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-xl leading-none">{property.sqft.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Square Feet</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About this home</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Experience the height of modern real estate inside this stunning {property.category.toLowerCase()} property. 
                Located at unparalleled convenience exactly at {property.address}. This property represents the exact premium standard verified by FlowState.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <h2 className="text-2xl font-bold">Premium Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {property.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground text-lg">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
             <div className="sticky top-24 bg-white border border-border shadow-2xl rounded-3xl p-6 md:p-8">
               <div className="mb-6">
                 <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Price</p>
                 <div className="text-4xl font-extrabold text-foreground">{formattedPrice}</div>
               </div>
               
               <Button className="w-full h-14 text-lg font-bold rounded-xl mb-4 shadow-lg hover:-translate-y-0.5 transition-all">
                 Book a Viewing
               </Button>
               <Button variant="outline" className="w-full h-14 text-lg font-semibold rounded-xl border-border hover:bg-slate-50 transition-colors">
                 Contact Agent
               </Button>

               <div className="mt-6 pt-6 border-t border-border flex items-center justify-center gap-2 text-sm text-muted-foreground">
                 <ShieldCheck className="h-4 w-4" />
                 Verified securely by FlowState.
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
