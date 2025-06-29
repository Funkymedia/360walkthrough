'use server';

import { z } from 'zod';

// NOTE: This is a mock implementation.
// To use the real EPC API, you need to register for an API key
// at https://epc.opendatacommunities.org/
// and set the credentials in your environment variables.

const DomesticSearchResultSchema = z.object({
  'rows': z.array(z.object({
    'address': z.string(),
    'lmk-key': z.string(),
    'current-energy-rating': z.string(),
    'potential-energy-rating': z.string(),
    'postcode': z.string(),
    'uprn': z.string(),
  })),
  'column-names': z.array(z.string()),
});
export type DomesticSearchResult = z.infer<typeof DomesticSearchResultSchema>;


const DomesticCertificateSchema = z.object({
    "address": z.string(),
    "local-authority-label": z.string(),
    "postcode": z.string(),
    "current-energy-rating": z.string(),
    "potential-energy-rating": z.string(),
    "current-energy-efficiency": z.number(),
    "potential-energy-efficiency": z.number(),
    "property-type": z.string(),
    "built-form": z.string(),
    "total-floor-area": z.string(),
    "lodgement-date": z.string(),
    "expiry-date": z.string(),
    "lmk-key": z.string(),
});
export type DomesticCertificate = z.infer<typeof DomesticCertificateSchema>;


export async function searchEpcs(postcode: string): Promise<DomesticSearchResult['rows']> {
  console.log(`Searching for EPCs with postcode: ${postcode}`);

  // TODO: Replace this mock data with a real API call.
  // The API requires authentication. You should store your credentials
  // in .env.local and access them via process.env.
  // const email = process.env.EPC_API_EMAIL;
  // const apiKey = process.env.EPC_API_KEY;
  // const credentials = Buffer.from(`${email}:${apiKey}`).toString('base64');
  // const response = await fetch(`https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${encodeURIComponent(postcode)}`, {
  //   headers: {
  //     'Authorization': `Basic ${credentials}`,
  //     'Accept': 'application/json'
  //   }
  // });
  // if (!response.ok) {
  //   throw new Error('Failed to fetch EPC data');
  // }
  // const data: DomesticSearchResult = await response.json();
  // return data.rows;
  
  // Returning mock data for now
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  if (postcode.toUpperCase().replace(/\s/g, '') === 'SW1A0AA') {
    return [
      {
        "address": "FLAT 1, 10 DOWNING STREET, LONDON, SW1A 0AA",
        "lmk-key": "1234-5678-9012-3456-7890",
        "current-energy-rating": "c",
        "potential-energy-rating": "b",
        "postcode": "SW1A 0AA",
        "uprn": "100023336956"
      },
      {
        "address": "FLAT 2, 10 DOWNING STREET, LONDON, SW1A 0AA",
        "lmk-key": "0987-6543-2109-8765-4321",
        "current-energy-rating": "d",
        "potential-energy-rating": "c",
        "postcode": "SW1A 0AA",
        "uprn": "100023336957"
      }
    ];
  }
  
  return [];
}


export async function getCertificate(lmkKey: string): Promise<DomesticCertificate> {
    console.log(`Fetching certificate with lmkKey: ${lmkKey}`);
    
    // TODO: Replace with real API call, similar to searchEpcs
    
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        "address": "FLAT 1, 10 DOWNING STREET, LONDON, SW1A 0AA",
        "local-authority-label": "City of Westminster",
        "postcode": "SW1A 0AA",
        "current-energy-rating": "c",
        "potential-energy-rating": "b",
        "current-energy-efficiency": 72,
        "potential-energy-efficiency": 85,
        "property-type": "Flat",
        "built-form": "Mid-terrace",
        "total-floor-area": "80",
        "lodgement-date": "2023-04-01",
        "expiry-date": "2033-04-01",
        "lmk-key": lmkKey,
    }
}
