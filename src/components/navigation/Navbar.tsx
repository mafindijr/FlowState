"use client";

import Link from "next/link";
import { Building2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            FlowState
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </Link>
            <Link href="/explore?category=Rentals" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Rentals
            </Link>
            <Link href="/explore?category=Luxury" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Luxury
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Log in
          </Link>
          <Link href="/dashboard/add-property">
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-medium shadow-sm transition-all hover:shadow">
              List Your Property
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/explore" className="text-lg font-medium">Explore</Link>
                <Link href="/explore?category=Rentals" className="text-lg font-medium">Rentals</Link>
                <Link href="/explore?category=Luxury" className="text-lg font-medium">Luxury</Link>
                <div className="h-px bg-border my-4" />
                <Link href="/login" className="text-lg font-medium">Log in</Link>
                <Link href="/dashboard/add-property" className="w-full">
                  <Button className="w-full mt-2 bg-primary text-white">List Your Property</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
