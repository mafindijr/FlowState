import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailLoading() {
  return (
    <div className="flex-1 bg-white">
      {/* High-res Gallery Skeleton */}
      <Skeleton className="w-full h-[50vh] md:h-[65vh] rounded-none" />

      <div className="container mx-auto px-4 max-w-7xl pt-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Area Skeleton */}
          <div className="lg:w-2/3 space-y-8 mt-2">
            <div>
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2" />
            </div>

            <div className="flex gap-6 py-6 border-y border-border">
               <Skeleton className="h-16 w-24 rounded-xl" />
               <Skeleton className="h-16 w-24 rounded-xl" />
               <Skeleton className="h-16 w-32 rounded-xl" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          {/* Sticky Sidebar Skeleton */}
          <div className="lg:w-1/3">
             <div className="sticky top-24 bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm">
               <div className="mb-6 space-y-2">
                 <Skeleton className="h-4 w-16" />
                 <Skeleton className="h-10 w-48" />
               </div>
               <Skeleton className="w-full h-14 rounded-xl mb-4" />
               <Skeleton className="w-full h-14 rounded-xl" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
