export interface PropertyImage {
  id: string;
  url: string;
  tags: string[];
}

export interface FloorPlan {
  id: string;
  name: string;
  url: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  description: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  images: PropertyImage[];
  floorPlans?: FloorPlan[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}
