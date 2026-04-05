export type PropertyStatus = "Available" | "Pending" | "Sold";

export interface Property {
  id: string;
  slug: string;
  title: string;
  address: string;
  price: number;
  status: PropertyStatus;
  category: "Residential" | "Commercial" | "Land" | "Luxury" | "Self-contained";
  listingType: "Rent" | "Sale";
  isSelfContained: boolean;
  featured?: boolean;
  beds: number;
  baths: number;
  sqft: number;
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  addedAt: string;
}

export interface Lead {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  createdAt: string;
}
