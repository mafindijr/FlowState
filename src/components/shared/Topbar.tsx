import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileDrawer } from "./Sidebar"; // imported from Sidebar.tsx 

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b bg-background px-6 shadow-sm">
      <MobileDrawer />
      
      <div className="flex flex-1 items-center gap-4 md:w-auto md:flex-none">
        <form className="hidden sm:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search properties, leads..."
              className="w-full rounded-md bg-muted/50 pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
        </form>
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <Button className="hidden sm:flex">Add Property</Button>
      </div>
    </header>
  );
}
