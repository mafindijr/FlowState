import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, ShieldCheck, Home, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockProperties } from "@/lib/mock-data";

export default function MarketingLanding() {
  const featuredProperties = mockProperties.filter(p => p.featured).slice(0, 3);

  return (
    <div className="flex-1 w-full relative">
      {/* Hero Section */}
      <section className="relative px-4 py-20 pb-32 md:py-32 md:pb-48 flex flex-col items-center justify-center text-center overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-primary/5 rounded-bl-[100px] pointer-events-none -z-0"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Premium real estate, reimagined.
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Find the place <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">you'll love to call home.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto pt-2">
            Experience the world's most intuitive platform for renting and buying high-end properties and self-contained apartments.
          </p>

          <div className="pt-8 flex justify-center">
            <Link href="/explore">
              <Button size="lg" className="rounded-full px-8 py-7 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                Explore Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Grid Discovery Section */}
      <section className="relative z-20 container mx-auto px-4 max-w-7xl -mt-20 md:-mt-32 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[500px]">
          
          {/* Main Bento Box */}
          <Link href="/explore?category=Luxury" className="group relative md:col-span-2 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
            <Image 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Luxury Homes"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white/80 font-medium mb-1 uppercase tracking-wider text-sm">Curated Collection</p>
              <h3 className="text-3xl font-bold text-white mb-2">Luxury Real Estate</h3>
              <p className="text-white/80 max-w-md">Browse our hand-picked selection of premium homes with unmatched amenities.</p>
            </div>
          </Link>

          {/* Side Bento Boxes */}
          <div className="flex flex-col gap-6 md:h-full">
            <Link href="/explore?category=Rentals" className="group relative flex-1 rounded-3xl overflow-hidden shadow-xl border-4 border-white min-h-[240px]">
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
              <Image 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Rentals"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white mb-1">Rental Apartments</h3>
                <p className="text-white/80 text-sm">Flexible living for modern pros.</p>
              </div>
            </Link>

            <Link href="/explore?category=Self-contained" className="group relative flex-1 rounded-3xl overflow-hidden shadow-xl border-4 border-white min-h-[240px]">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
              <Image 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Self Contained"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white mb-1">Self-contained</h3>
                <p className="text-white/80 text-sm">Total privacy made easy.</p>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* Why FlowState Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why choose FlowState?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We've engineered a seamless platform designed to remove friction from the property discovery process.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Verified Listings</h3>
              <p className="text-muted-foreground leading-relaxed">Every property undergoes a strict verification process ensuring what you see is strictly what you get.</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Search className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Smart Discovery</h3>
              <p className="text-muted-foreground leading-relaxed">Advanced algorithms and beautiful mapping systems to help you pinpoint the exact living situation you need.</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Key className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Instant Booking</h3>
              <p className="text-muted-foreground leading-relaxed">Schedule viewings seamlessly and submit applications via our integrated platform with one click.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
