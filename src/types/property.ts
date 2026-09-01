export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: string;
  status: string;
  city: string;
  address: string;
  location: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  floor?: number;
  yearBuilt: number;
  imageUrl: string;
  images: string[];
  features: string[];
  amenities: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  featured: boolean;
  createdAt: string;
}
