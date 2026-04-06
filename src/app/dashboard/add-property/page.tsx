"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Save, Loader2, UploadCloud, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createProperty } from "@/actions/property";

export default function AddPropertyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      address: formData.get("address") as string,
      price: Number(formData.get("price")),
      category: formData.get("category") as "Residential" | "Commercial" | "Land" | "Luxury" | "Self-contained",
      listingType: formData.get("listingType") as "Rent" | "Sale",
      isSelfContained: formData.get("isSelfContained") === "true",
      beds: Number(formData.get("beds")),
      baths: Number(formData.get("baths")),
      sqft: Number(formData.get("sqft")),
      imageUrl: formData.get("imageUrl") as string || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    };

    try {
      const response = await createProperty(data);
      if (response.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1500);
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Something went wrong adding the property.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 mb-2">Property Added!</h2>
        <p className="text-muted-foreground text-lg">Taking you back to the dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Building2 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Add New Property</h1>
          <p className="text-muted-foreground mt-1">List a premium real estate asset in your portfolio.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-md overflow-hidden">
        <form onSubmit={handleSubmit} className="divide-y divide-border">
          
          <div className="p-8 space-y-6">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-semibold text-foreground">Property Title</label>
              <input 
                required 
                id="title"
                name="title" 
                placeholder="e.g. Modern Glass Villa in Beverly Hills" 
                className="w-full flex h-12 rounded-xl border border-border bg-slate-50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-semibold text-foreground">Full Address</label>
              <input 
                required 
                id="address"
                name="address" 
                placeholder="e.g. 123 Luxury Lane, Beverly Hills, CA 90210" 
                className="w-full flex h-12 rounded-xl border border-border bg-slate-50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-semibold text-foreground">Price ($)</label>
                <input 
                  required 
                  type="number"
                  min="1"
                  id="price"
                  name="price" 
                  placeholder="e.g. 2500000" 
                  className="w-full flex h-12 rounded-xl border border-border bg-slate-50 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="listingType" className="text-sm font-semibold text-foreground">Listing Type</label>
                <select 
                  id="listingType"
                  name="listingType"
                  className="w-full flex h-12 rounded-xl border border-border bg-slate-50 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                >
                  <option value="Sale">Sale</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-semibold text-foreground">Category</label>
                <select 
                  id="category"
                  name="category"
                  className="w-full flex h-12 rounded-xl border border-border bg-slate-50 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                >
                  <option value="Residential">Residential</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Self-contained">Self-contained</option>
                  <option value="Land">Land</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="isSelfContained" className="text-sm font-semibold text-foreground">Self-Contained Unit?</label>
                <select 
                  id="isSelfContained"
                  name="isSelfContained"
                  className="w-full flex h-12 rounded-xl border border-border bg-slate-50 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-50/50 space-y-6">
            <h2 className="text-xl font-bold mb-4">Property Characteristics</h2>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="beds" className="text-sm font-semibold text-foreground">Beds</label>
                <input 
                  required 
                  type="number"
                  min="0"
                  id="beds"
                  name="beds" 
                  placeholder="e.g. 5" 
                  className="w-full flex h-12 rounded-xl border border-border bg-white px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="baths" className="text-sm font-semibold text-foreground">Baths</label>
                <input 
                  required 
                  type="number"
                  min="0"
                  step="0.5"
                  id="baths"
                  name="baths" 
                  placeholder="e.g. 4.5" 
                  className="w-full flex h-12 rounded-xl border border-border bg-white px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="sqft" className="text-sm font-semibold text-foreground">Square Feet</label>
                <input 
                  required 
                  type="number"
                  min="1"
                  id="sqft"
                  name="sqft" 
                  placeholder="e.g. 4500" 
                  className="w-full flex h-12 rounded-xl border border-border bg-white px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <label htmlFor="imageUrl" className="text-sm font-semibold text-foreground">Feature Image URL</label>
              <div className="flex gap-4">
                <input 
                  id="imageUrl"
                  name="imageUrl" 
                  placeholder="https://images.unsplash.com/photo-..." 
                  className="w-full flex h-12 rounded-xl border border-border bg-white px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                />
              </div>
            </div>
          </div>
          
          {errorMsg && (
            <div className="p-4 m-8 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
               {errorMsg}
            </div>
          )}

          <div className="p-8 flex justify-end gap-4 bg-white">
            <Button type="button" variant="outline" className="h-12 px-8 rounded-xl font-semibold border-border hover:bg-slate-50 hover:text-foreground" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="h-12 px-8 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Adding Property...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Save Property
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
