export interface ImagePath {
  id: string;
  name: string;
  targetImageId: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  tags: string[];
  paths?: ImagePath[];
  startingView?: {
    pitch: number;
    yaw: number;
  };
}

export interface StandardPropertyImage {
  id: string;
  name: string;
  url: string;
  editedUrl?: string;
  instructions?: string;
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
  standardImages?: StandardPropertyImage[];
  floorPlans?: FloorPlan[];
  tourUrl?: string;
  brandingLogoUrl?: string;
  heroImageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}
