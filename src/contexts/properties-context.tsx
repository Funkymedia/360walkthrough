'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { mockProperties } from '@/lib/data';
import type { Property, FloorPlan, PropertyImage, StandardPropertyImage } from '@/lib/types';
import type { PropertyFormValues } from '@/components/dashboard/property-form';

export type FloorPlanFormValues = { name: string; file: File };

interface PropertiesContextType {
    properties: Property[];
    addProperty: (propertyData: PropertyFormValues) => void;
    updateProperty: (propertyId: string, propertyData: PropertyFormValues) => void;
    updateTourUrl: (propertyId: string, tourUrl: string) => void;
    importProperties: (newProperties: Property[]) => void;
    addFloorPlan: (propertyId: string, floorPlanData: FloorPlanFormValues) => void;
    deleteFloorPlan: (propertyId: string, floorPlanId: string) => void;
    addImage: (propertyId: string, imageFile: File) => Promise<PropertyImage>;
    updateImage: (propertyId: string, updatedImage: PropertyImage) => void;
    deleteImage: (propertyId: string, imageId: string) => void;
    addStandardImage: (propertyId: string, imageFile: File) => Promise<StandardPropertyImage>;
    updateStandardImage: (propertyId: string, updatedImage: StandardPropertyImage) => void;
    deleteStandardImage: (propertyId: string, imageId: string) => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export function PropertiesProvider({ children }: { children: ReactNode }) {
    const [properties, setProperties] = useState<Property[]>(mockProperties);

    const addProperty = (data: PropertyFormValues) => {
        const newProperty: Property = {
            id: `prop-${Date.now()}`,
            name: data.name,
            address: data.address,
            description: data.description,
            contact: {
                name: data.contactName,
                email: data.contactEmail,
                phone: data.contactPhone,
            },
            images: [],
            standardImages: [],
            floorPlans: [],
            brandingLogoUrl: data.brandingLogo?.[0] ? URL.createObjectURL(data.brandingLogo[0]) : undefined,
            heroImageUrl: data.heroImage?.[0] ? URL.createObjectURL(data.heroImage[0]) : undefined,
        };
        setProperties(prev => [newProperty, ...prev]);
    };

    const updateProperty = (propertyId: string, data: PropertyFormValues) => {
        setProperties(prev =>
            prev.map(p => {
                if (p.id === propertyId) {
                    const newLogoFile = data.brandingLogo?.[0];
                    const newLogoUrl = newLogoFile ? URL.createObjectURL(newLogoFile) : p.brandingLogoUrl;
                    const newHeroImageFile = data.heroImage?.[0];
                    const newHeroImageUrl = newHeroImageFile ? URL.createObjectURL(newHeroImageFile) : p.heroImageUrl;

                    return {
                        ...p,
                        name: data.name,
                        address: data.address,
                        description: data.description,
                        contact: {
                            name: data.contactName,
                            email: data.contactEmail,
                            phone: data.contactPhone,
                        },
                        brandingLogoUrl: newLogoUrl,
                        heroImageUrl: newHeroImageUrl,
                    };
                }
                return p;
            })
        );
    };
    
    const updateTourUrl = (propertyId: string, tourUrl: string) => {
        setProperties(prev =>
            prev.map(p => {
                if (p.id === propertyId) {
                    return { ...p, tourUrl: tourUrl };
                }
                return p;
            })
        );
    };

    const importProperties = (newProperties: Property[]) => {
        setProperties(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const uniqueNewProperties = newProperties.filter(p => !existingIds.has(p.id));
            return [...uniqueNewProperties, ...prev];
        });
    };

    const addFloorPlan = (propertyId: string, floorPlanData: FloorPlanFormValues) => {
        const newFloorPlan: FloorPlan = {
            id: `fp-${Date.now()}`,
            name: floorPlanData.name,
            url: URL.createObjectURL(floorPlanData.file),
        };

        setProperties(prev => 
            prev.map(p => {
                if (p.id === propertyId) {
                    return {
                        ...p,
                        floorPlans: [...(p.floorPlans || []), newFloorPlan],
                    };
                }
                return p;
            })
        );
    };
    
    const deleteFloorPlan = (propertyId: string, floorPlanId: string) => {
        setProperties(prev =>
            prev.map(p => {
                if (p.id === propertyId) {
                    return {
                        ...p,
                        floorPlans: p.floorPlans?.filter(fp => fp.id !== floorPlanId),
                    };
                }
                return p;
            })
        );
    };

    const addImage = (propertyId: string, imageFile: File): Promise<PropertyImage> => {
        return new Promise((resolve) => {
          const newImage: PropertyImage = {
            id: `img-${Date.now()}`,
            url: URL.createObjectURL(imageFile),
            tags: [],
            paths: [],
          };
    
          setProperties((prev) =>
            prev.map((p) => {
              if (p.id === propertyId) {
                return {
                  ...p,
                  images: [...p.images, newImage],
                };
              }
              return p;
            })
          );
          resolve(newImage);
        });
      };
    
      const updateImage = (propertyId: string, updatedImage: PropertyImage) => {
        setProperties((prev) =>
          prev.map((p) => {
            if (p.id === propertyId) {
              return {
                ...p,
                images: p.images.map((img) => (img.id === updatedImage.id ? updatedImage : img)),
              };
            }
            return p;
          })
        );
      };
    
      const deleteImage = (propertyId: string, imageId: string) => {
        setProperties((prev) =>
          prev.map((p) => {
            if (p.id === propertyId) {
              return {
                ...p,
                images: p.images.filter((img) => img.id !== imageId),
              };
            }
            return p;
          })
        );
      };

    const addStandardImage = (propertyId: string, imageFile: File): Promise<StandardPropertyImage> => {
        return new Promise((resolve) => {
            const newImage: StandardPropertyImage = {
                id: `s-img-${Date.now()}`,
                name: imageFile.name,
                url: URL.createObjectURL(imageFile),
            };
            setProperties((prev) =>
                prev.map((p) => {
                    if (p.id === propertyId) {
                        return {
                            ...p,
                            standardImages: [...(p.standardImages || []), newImage],
                        };
                    }
                    return p;
                })
            );
            resolve(newImage);
        });
    };

    const updateStandardImage = (propertyId: string, updatedImage: StandardPropertyImage) => {
        setProperties((prev) =>
            prev.map((p) => {
                if (p.id === propertyId) {
                    return {
                        ...p,
                        standardImages: (p.standardImages || []).map((img) => (img.id === updatedImage.id ? updatedImage : img)),
                    };
                }
                return p;
            })
        );
    };

    const deleteStandardImage = (propertyId: string, imageId: string) => {
        setProperties((prev) =>
            prev.map((p) => {
                if (p.id === propertyId) {
                    return {
                        ...p,
                        standardImages: (p.standardImages || []).filter((img) => img.id !== imageId),
                    };
                }
                return p;
            })
        );
    };


    return (
        <PropertiesContext.Provider value={{ properties, addProperty, updateProperty, updateTourUrl, importProperties, addFloorPlan, deleteFloorPlan, addImage, updateImage, deleteImage, addStandardImage, updateStandardImage, deleteStandardImage }}>
            {children}
        </PropertiesContext.Provider>
    );
}

export function useProperties() {
    const context = useContext(PropertiesContext);
    if (context === undefined) {
        throw new Error('useProperties must be used within a PropertiesProvider');
    }
    return context;
}
