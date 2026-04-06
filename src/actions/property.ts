"use server";

import { revalidatePath } from "next/cache";
import { Property } from "@/types";
import { addMockProperty } from "@/lib/mock-data";
import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(3),
  address: z.string().min(5),
  price: z.number().positive(),
  category: z.enum(["Residential", "Commercial", "Land", "Luxury", "Self-contained"]),
  listingType: z.enum(["Rent", "Sale"]),
  isSelfContained: z.boolean(),
  beds: z.number().nonnegative(),
  baths: z.number().nonnegative(),
  sqft: z.number().positive(),
  imageUrl: z.string().url(),
});

export async function createProperty(data: z.infer<typeof propertySchema>) {
  // Simulate DB Delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newProperty: Property = {
    ...data,
    id: `prop-${Math.random().toString(36).substr(2, 9)}`,
    slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
    status: "Available",
    amenities: ["New Listing"],
    coordinates: { lat: 34.0522, lng: -118.2437 }, // Default mock coords
    addedAt: new Date().toISOString(),
  };

  // Mutate in-memory store
  addMockProperty(newProperty);

  // Revalidate caches to instantly update UI across Server Components
  revalidatePath("/explore");
  revalidatePath("/");

  return { success: true, slug: newProperty.slug };
}
