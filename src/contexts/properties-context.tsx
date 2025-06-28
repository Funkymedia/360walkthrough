'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { mockProperties } from '@/lib/data';
import type { Property } from '@/lib/types';
import type { PropertyFormValues } from '@/components/dashboard/property-form';

interface PropertiesContextType {
    properties: Property[];
    addProperty: (propertyData: PropertyFormValues) => void;
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
            floorPlans: [],
        };
        setProperties(prev => [newProperty, ...prev]);
    };
    
    return (
        <PropertiesContext.Provider value={{ properties, addProperty }}>
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
