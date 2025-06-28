import type { User, Property } from './types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://placehold.co/100x100.png',
};

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    name: 'Modern Downtown Loft',
    address: '123 Main St, Anytown, USA 12345',
    description: 'A beautiful and spacious loft in the heart of the city. Features stunning views, modern amenities, and an open floor plan. Perfect for urban living.',
    contact: {
      name: 'Jane Realtor',
      email: 'jane.realtor@example.com',
      phone: '555-123-4567',
    },
    tourUrl: 'https://kuula.co/share/collection/7q1vF?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
    images: [
      { 
        id: 'img-1-1', 
        url: 'https://placehold.co/800x400.png', 
        tags: ['living room', 'modern', 'city view'],
        startingView: { pitch: 10, yaw: -90 },
        paths: [
          { id: 'path-1', name: 'Go to Kitchen', targetImageId: 'img-1-2' }
        ]
      },
      { 
        id: 'img-1-2', 
        url: 'https://placehold.co/800x400.png', 
        tags: ['kitchen', 'granite worktops', 'stainless steel'],
        startingView: { pitch: 0, yaw: 0 },
        paths: [
          { id: 'path-2', name: 'Go to Living Room', targetImageId: 'img-1-1' }
        ]
      },
    ],
    floorPlans: [
      { id: 'fp-1-1', name: 'Ground Floor', url: 'https://placehold.co/800x600.png' },
      { id: 'fp-1-2', name: 'First Floor', url: 'https://placehold.co/800x600.pdf' }
    ],
  },
  {
    id: 'prop-2',
    name: 'Suburban Family Home',
    address: '456 Oak Ave, Suburbia, USA 54321',
    description: 'Charming 4-bedroom home in a quiet, family-friendly neighbourhood. Large backyard, newly renovated kitchen, and a two-car garage.',
    contact: {
      name: 'John Agent',
      email: 'john.agent@example.com',
      phone: '555-987-6543',
    },
    images: [
      { id: 'img-2-1', url: 'https://placehold.co/800x400.png', tags: ['exterior', 'suburban', 'brick'] },
    ],
    floorPlans: [],
  },
  {
    id: 'prop-3',
    name: 'Cosy Beachside Cottage',
    address: '789 Ocean Blvd, Beachtown, USA 67890',
    description: 'A quaint cottage just steps from the sand. Enjoy ocean breezes from the porch and fall asleep to the sound of waves. Ideal for a vacation home or rental property.',
    contact: {
      name: 'Sandy Shore',
      email: 'sandy.shore@example.com',
      phone: '555-555-5555',
    },
    images: [],
    floorPlans: [
        { id: 'fp-3-1', name: 'Main Floor', url: 'https://placehold.co/800x600.png' }
    ],
  },
];
