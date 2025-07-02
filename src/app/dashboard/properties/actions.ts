'use server';

import { fetchAltoProperties, parseAltoProperties } from '@/services/alto-service';
import type { Property } from '@/lib/types';

export async function importFromAltoAction(): Promise<Property[]> {
  try {
    const propertiesXml = await fetchAltoProperties();
    if (!propertiesXml) {
      console.log('No properties returned from Alto API.');
      return [];
    }
    
    const parsedProperties = await parseAltoProperties(propertiesXml);
    return parsedProperties;

  } catch (error) {
    console.error('Error in importFromAltoAction:', error);
    // Propagate the error to be caught by the client-side caller
    throw new Error('Failed to import properties from Alto. Please check server logs.');
  }
}
