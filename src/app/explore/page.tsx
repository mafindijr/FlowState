import { Suspense } from "react";
import { mockProperties } from "@/lib/mock-data";
import { PropertyGrid } from "@/components/explore/PropertyGrid";

export const metadata = {
  title: "Explore Premium Real Estate | FlowState",
  description: "Browse our curated collection of high-end homes and self-contained apartments.",
};

export default function ExplorePage() {
  return (
    <div className="flex-1 w-full bg-slate-50 min-h-screen">
      <div className="bg-primary/5 py-12 border-b border-border/50 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">Explore Properties</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Discover your perfect space. Instant filtering. Zero friction.</p>
      </div>
      {/* We use suspense boundary because PropertyGrid uses useSearchParams hook */}
      <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading grid...</div>}>
        <PropertyGrid properties={mockProperties} />
      </Suspense>
    </div>
  );
}
