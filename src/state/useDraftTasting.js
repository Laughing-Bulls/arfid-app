import { create } from 'zustand';

/**
 * Photo type can be:
 * - { kind: 'stock', id: string } for stock photos
 * - { kind: 'uri', uri: string } for user photos
 * - null for no photo
 */
const useDraftTasting = create((set, get) => ({
  // Form fields
  title: '',
  brand: '',
  selectedCategory: 'Other',
  rating: 0,
  notes: '',
  photo: null,
  dateTried: new Date().toISOString().split('T')[0], // Default to today

  // Actions
  setField: (field, value) => set({ [field]: value }),
  
  setPhoto: (photo) => set({ photo }),
  
  reset: () => set({
    title: '',
    brand: '',
    selectedCategory: 'Other',
    rating: 0,
    notes: '',
    photo: null,
    dateTried: new Date().toISOString().split('T')[0],
  }),

  // Get current state
  getDraft: () => get(),
}));

export default useDraftTasting;
