import Link from "next/link";
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  Settings,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Building2, label: "Inventory", href: "/inventory" },
  { icon: Users, label: "Leads", href: "/leads" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  return (
    <div className="hidden border-r bg-sidebar text-sidebar-foreground md:flex md:w-64 md:flex-col">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          FlowState
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center font-semibold text-sm">
            AD
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-sidebar-foreground/60">admin@flowstate.co</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-sidebar text-sidebar-foreground p-0 border-r-sidebar-border">
        <div className="flex h-16 shrink-0 items-center px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            FlowState
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
