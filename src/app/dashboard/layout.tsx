import { redirect } from "next/navigation";
import { checkAuth } from "@/actions/auth";
import Link from "next/link";
import { Building2, Plus, LayoutDashboard, Settings, LogOut, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="flex-1 flex bg-slate-50 min-h-[calc(100vh-4rem)]">
      {/* Dashboard Sidebar */}
      <aside className="w-64 bg-white border-r border-border flex flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Management</h2>
          <nav className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-primary/5 text-primary font-medium rounded-lg">
              <LayoutDashboard className="h-5 w-5" />
              Overview
            </Link>
            <Link href="/dashboard/leads" className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:bg-slate-50 hover:text-foreground font-medium rounded-lg transition-colors">
              <MessageSquare className="h-5 w-5" />
              Leads
            </Link>
            <Link href="/dashboard/add-property" className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:bg-slate-50 hover:text-foreground font-medium rounded-lg transition-colors">
              <Plus className="h-5 w-5" />
              Add Property
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:bg-slate-50 hover:text-foreground font-medium rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
        
        <div className="mt-auto p-6 space-y-4 border-t border-border">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-full bg-slate-200 flex flex-col items-center justify-center font-bold text-slate-500">
               AD
             </div>
             <div>
               <p className="text-sm font-bold">Admin User</p>
               <p className="text-xs text-muted-foreground">Pro Agent</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
