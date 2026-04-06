import { getMockProperties, mockLeads } from "@/lib/mock-data";
import { Building2, Home, CheckCircle2, TrendingUp, DollarSign, MessageSquare, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function DashboardOverview() {
  const properties = getMockProperties();
  
  if (properties.length === 0) {
    redirect("/dashboard/add-property");
  }

  const totalProperties = properties.length;
  const activeListings = properties.filter(p => p.status === "Available").length;
  const totalValue = properties.reduce((acc, curr) => acc + curr.price, 0);
  const totalViews = properties.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const conversionRate = totalViews > 0 ? (mockLeads.length / totalViews) * 100 : 0;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Manage your premium real estate portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Properties</p>
            <p className="text-3xl font-bold">{totalProperties}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 shrink-0">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Active Listings</p>
            <p className="text-3xl font-bold">{activeListings}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Value</p>
            <p className="text-3xl font-bold">${(totalValue / 1000000).toFixed(1)}M</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Listing Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-4">
             <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Views</p>
             <div className="flex items-end justify-between">
                <p className="text-4xl font-extrabold">{totalViews.toLocaleString()}</p>
                <div className="h-8 w-12 flex items-end gap-1 pb-1">
                   {[40, 70, 50, 90, 60].map((h, i) => (
                     <div key={i} className="bg-primary/40 w-full rounded-t-sm" style={{ height: `${h}%` }}></div>
                   ))}
                </div>
             </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
             <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Avg. Engagement</p>
             <div className="flex items-end justify-between">
                <p className="text-4xl font-extrabold text-foreground">{conversionRate.toFixed(1)}%</p>
                <div className="h-8 w-12 flex items-end gap-1 pb-1">
                   {[30, 40, 60, 40, 70].map((h, i) => (
                     <div key={i} className="bg-teal-500/20 w-full rounded-t-sm" style={{ height: `${h}%` }}></div>
                   ))}
                </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm col-span-1 md:col-span-2">
             <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-4">Performance Trend</p>
             <div className="h-16 w-full flex items-end gap-2">
                {[20, 45, 30, 60, 40, 80, 55, 90, 70, 85, 40, 60].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-primary/5 to-primary/30 rounded-t-lg transition-all hover:to-primary" 
                    style={{ height: `${h}%` }}
                    title={`Day ${i+1}: ${h}%`}
                  ></div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24">
        {/* Recent Properties Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold">Recent Properties</h2>
            <Link href="/explore" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-sm text-muted-foreground">
                  <th className="p-4 font-medium">Property</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {properties.slice(0, 5).map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-12 rounded-md overflow-hidden bg-slate-100 shrink-0">
                          <Image src={property.imageUrl} alt={property.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm line-clamp-1">{property.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{property.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                      ${property.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 
                        property.status === 'Sold' || property.status === 'Rented' ? 'bg-red-100 text-red-800' : 
                        'bg-amber-100 text-amber-800'}
                    `}>
                      {property.status === "Sold" ? "Sold Out" : property.status === "Rented" ? "Rented" : property.status}
                    </span>
                  </td>
                    <td className="p-4 font-medium text-sm">
                       ${property.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Leads Sidebar */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold">Recent Inquiries</h2>
            <Link href="/dashboard/leads" className="text-sm font-semibold text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="p-4 space-y-4 flex-1">
            {mockLeads.slice(0, 4).map((lead) => {
              const leadProperty = properties.find(p => p.id === lead.propertyId);
              return (
                <div key={lead.id} className="p-4 rounded-xl border border-border hover:border-primary/20 hover:bg-primary/5 transition-all group">
                   <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-sm tracking-tight">{lead.name}</p>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-slate-100 px-1.5 py-0.5 rounded">New</span>
                   </div>
                   <p className="text-xs text-muted-foreground line-clamp-2 italic mb-3">"{lead.message}"</p>
                   {leadProperty && (
                     <div className="flex items-center gap-2 text-[10px] font-medium text-primary">
                        <Home className="h-3 w-3" />
                        {leadProperty.title}
                     </div>
                   )}
                </div>
              );
            })}
            {mockLeads.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                 <MessageSquare className="h-10 w-10 mb-2" />
                 <p className="text-sm font-medium">No inquiries yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
