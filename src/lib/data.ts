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
    name: 'Modern Central London Flat',
    address: '123 The Shard, London Bridge St, London SE1 9SG',
    description: 'A beautiful and spacious flat in the heart of the city. Features stunning views, modern amenities, and an open floor plan. Perfect for urban living.',
    contact: {
      name: 'James Agent',
      email: 'james.agent@example.com',
      phone: '020 7123 4567',
    },
    tourUrl: 'https://kuula.co/share/collection/7q1vF?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1',
    brandingLogoUrl: 'https://placehold.co/150x50.png',
    images: [
      { 
        id: 'img-1-1', 
        url: 'https://placehold.co/600x400.png', 
        tags: ['living room', 'modern', 'city view'],
        startingView: { pitch: 10, yaw: -90 },
        paths: [
          { id: 'path-1', name: 'Go to Kitchen', targetImageId: 'img-1-2' }
        ]
      },
      { 
        id: 'img-1-2', 
        url: 'https://placehold.co/600x400.png', 
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
    address: '456 Oak Drive, Richmond, London TW9 1AB',
    description: 'Charming 4-bedroom home in a quiet, family-friendly neighbourhood. Large garden, newly renovated kitchen, and a two-car garage.',
    contact: {
      name: 'Emily Smith',
      email: 'emily.smith@example.com',
      phone: '07700 900123',
    },
    images: [
      { id: 'img-2-1', url: 'https://placehold.co/600x400.png', tags: ['exterior', 'suburban', 'brick'] },
    ],
    floorPlans: [],
  },
  {
    id: 'prop-3',
    name: 'Cosy Seaside Cottage',
    address: '789 Coastguard Cottages, Brighton, BN2 1ET',
    description: 'A quaint cottage just steps from the beach. Enjoy sea breezes from the porch and fall asleep to the sound of waves. Ideal for a holiday home or rental property.',
    contact: {
      name: 'David Jones',
      email: 'david.jones@example.com',
      phone: '07700 900456',
    },
    images: [],
    floorPlans: [
        { id: 'fp-3-1', name: 'Main Floor', url: 'https://placehold.co/800x600.png' }
    ],
  },
];
