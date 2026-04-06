"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Building2, Save, Loader2, UploadCloud, CheckCircle2, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createProperty } from "@/actions/property";

export default function AddPropertyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload an image file (PNG, JPG, WEBP, etc.)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Image must be less than 10MB");
      return;
    }
    setErrorMsg("");
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = () => {
    setImagePreview(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
      imageUrl: imagePreview || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
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
                <label htmlFor="price" className="text-sm font-semibold text-foreground">Price (₦)</label>
                <input 
                  required 
                  type="number"
                  min="1"
                  id="price"
                  name="price" 
                  placeholder="e.g. 25000000" 
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

            {/* Drag & Drop Image Upload */}
            <div className="space-y-2 mt-4">
              <label className="text-sm font-semibold text-foreground">Feature Image</label>
              
              <input 
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
              />

              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 bg-white group">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-3">
                      <Button 
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg font-semibold"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImagePlus className="h-4 w-4 mr-2" />
                        Replace
                      </Button>
                      <Button 
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="rounded-xl bg-white/90 backdrop-blur-sm hover:bg-red-50 hover:text-red-600 shadow-lg font-semibold"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-foreground truncate max-w-[200px]">{fileName}</span>
                  </div>
                </div>
              ) : (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-8
                    flex flex-col items-center justify-center gap-4 min-h-[200px]
                    ${isDragging 
                      ? "border-primary bg-primary/5 scale-[1.02] shadow-lg" 
                      : "border-border/60 bg-white hover:border-primary/40 hover:bg-primary/[0.02]"
                    }
                  `}
                >
                  <div className={`
                    h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-300
                    ${isDragging ? "bg-primary/15 scale-110" : "bg-slate-100"}
                  `}>
                    <UploadCloud className={`h-8 w-8 transition-colors duration-300 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                  </div>

                  <div className="text-center space-y-1.5">
                    <p className="text-sm font-semibold text-foreground">
                      {isDragging ? "Drop your image here" : "Drag & drop your image here"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      or <span className="text-primary font-semibold hover:underline">browse files</span> from your device
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                    <span>PNG</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                    <span>JPG</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                    <span>WEBP</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                    <span>Max 10MB</span>
                  </div>
                </div>
              )}
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
