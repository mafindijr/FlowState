export type PropertyStatus = "Available" | "Pending" | "Sold";

export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  status: PropertyStatus;
  category: "Residential" | "Commercial" | "Land";
  beds: number;
  baths: number;
  sqft: number;
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
