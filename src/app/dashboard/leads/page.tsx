import { mockLeads, getMockProperties } from "@/lib/mock-data";
import { Mail, Phone, MessageSquare, ExternalLink, Filter } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function LeadsPage() {
  const properties = getMockProperties();
  
  if (properties.length === 0) {
    redirect("/dashboard/add-property");
  }
  
  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
             Property Inquiries
             <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{mockLeads.length} New</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage and respond to potential buyer inquiries.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
              <Filter className="h-4 w-4" />
              Filter Leads
           </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-slate-50/50 text-sm text-muted-foreground">
                <th className="p-5 font-medium">Inquirer</th>
                <th className="p-5 font-medium">Property Interest</th>
                <th className="p-5 font-medium">Message</th>
                <th className="p-5 font-medium">Status</th>
                <th className="p-5 font-medium">Time</th>
                <th className="p-5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockLeads.map((lead) => {
                const property = properties.find(p => p.id === lead.propertyId);
                return (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground">{lead.name}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      {property ? (
                        <Link href={`/explore/${property.slug}`} className="text-sm font-medium text-primary hover:underline flex items-center gap-1.5 underline-offset-4">
                           {property.title}
                           <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">General Inquiry</span>
                      )}
                    </td>
                    <td className="p-5 max-w-xs">
                       <p className="text-sm text-muted-foreground line-clamp-2 italic">"{lead.message}"</p>
                    </td>
                    <td className="p-5">
                       <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wide ring-1 ring-amber-200">
                          {lead.status}
                       </span>
                    </td>
                    <td className="p-5 text-sm text-muted-foreground">
                       {new Date(lead.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </td>
                    <td className="p-5">
                       <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button title="Call Client" className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-colors">
                             <Phone className="h-4 w-4" />
                          </button>
                          <button title="Send Email" className="h-10 w-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary border border-primary/10 hover:bg-primary/10 transition-colors">
                             <MessageSquare className="h-4 w-4" />
                          </button>
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {mockLeads.length === 0 && (
            <div className="p-20 text-center text-muted-foreground flex flex-col items-center gap-3">
               <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <MessageSquare className="h-8 w-8" />
               </div>
               <p className="text-lg font-semibold text-slate-800">No inquiries yet.</p>
               <p className="max-w-xs mx-auto">Once users message you about properties, they'll appear here automatically.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
