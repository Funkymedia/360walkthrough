import { parseStringPromise } from 'xml2js';
import type { Property } from '@/lib/types';

const API_BASE_URL = 'http://webservices.vebra.com/export';

// In-memory cache for the API token
let cachedToken: { token: string | null; expires: number } = {
  token: null,
  expires: 0,
};

/**
 * Fetches a new API token from Alto and caches it.
 */
async function getAltoToken(): Promise<string> {
  const username = process.env.ALTO_USERNAME;
  const password = process.env.ALTO_PASSWORD;
  const dataFeedId = process.env.ALTO_DATAFEED_ID;

  if (!username || !password || !dataFeedId) {
    throw new Error('Alto API credentials are not configured in .env');
  }

  // The URL to get the token is the same as the data URL, but we use a HEAD request.
  const url = `${API_BASE_URL}/${dataFeedId}/v10/branch`;
  const credentials = Buffer.from(`${username}:${password}`).toString('base64');

  const response = await fetch(url, {
    method: 'HEAD',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get Alto token: ${response.statusText}`);
  }

  const token = response.headers.get('Token');
  if (!token) {
    throw new Error('No token found in Alto API response headers.');
  }

  // Cache the token for 59 minutes (token is valid for 1 hour)
  cachedToken = {
    token: Buffer.from(token).toString('base64'),
    expires: Date.now() + 59 * 60 * 1000,
  };

  return cachedToken.token;
}

/**
 * Ensures a valid token is available, fetching a new one if necessary.
 */
async function ensureValidToken(): Promise<string> {
  if (cachedToken.token && Date.now() < cachedToken.expires) {
    return cachedToken.token;
  }
  return getAltoToken();
}

/**
 * Fetches the raw property XML data from the Alto API.
 */
export async function fetchAltoProperties(): Promise<string> {
    const dataFeedId = process.env.ALTO_DATAFEED_ID;
    if (!dataFeedId) {
        throw new Error('Alto data feed ID is not configured in .env');
    }
    
    const url = `${API_BASE_URL}/${dataFeedId}/v10/branch`;
    let token = await ensureValidToken();

    let response = await fetch(url, {
        headers: {
            Authorization: `Basic ${token}`,
            Accept: 'application/xml',
        },
    });

    // If unauthorized, the token might have expired. Try fetching a new one.
    if (response.status === 401) {
        console.log('Alto token expired or invalid. Fetching a new one.');
        token = await getAltoToken();
        response = await fetch(url, {
            headers: {
                Authorization: `Basic ${token}`,
                Accept: 'application/xml',
            },
        });
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch Alto properties: ${response.statusText}`);
    }

    return response.text();
}


/**
 * Parses the XML string from Alto into an array of Property objects.
 * Note: This parser is based on a common Vebra/Alto XML structure.
 * It might need adjustments based on the actual data feed.
 */
export async function parseAltoProperties(xmlString: string): Promise<Property[]> {
    const parsedXml = await parseStringPromise(xmlString, {
        explicitArray: false,
        ignoreAttrs: false,
        mergeAttrs: true,
    });

    const branches = parsedXml.branches?.branch;
    if (!branches) {
        console.log('No branches found in the Alto XML feed.');
        return [];
    }
    
    const allProperties: Property[] = [];
    const branchArray = Array.isArray(branches) ? branches : [branches];

    for (const branch of branchArray) {
        const properties = branch.properties?.property;
        if (!properties) continue;
        
        const propertyArray = Array.isArray(properties) ? properties : [properties];

        for (const altoProp of propertyArray) {
            const displayAddress = altoProp.address?.display;

            const newProperty: Property = {
                // Use Alto property ID as our ID to avoid duplicates on re-import
                id: `alto-${altoProp.id}`, 
                name: displayAddress || 'Unnamed Property from Alto',
                address: displayAddress || 'Address not provided',
                description: altoProp.description || 'Description not provided',
                contact: {
                    name: branch.name || 'Branch Contact',
                    email: branch.email || 'not.provided@example.com',
                    phone: branch.tel || 'N/A',
                },
                images: [],
                standardImages: [],
                floorPlans: [],
            };
            allProperties.push(newProperty);
        }
    }

    return allProperties;
}
