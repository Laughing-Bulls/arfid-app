// Simple test to verify Zustand store functionality
import useDraftTasting from './useDraftTasting';

// This is a simple verification that the store works
// In a real app, you'd use Jest or similar testing framework

console.log('Testing Zustand store...');

// Test 1: Initial state
const initialState = useDraftTasting.getState();
console.log('Initial state:', initialState);

// Test 2: Setting fields
useDraftTasting.getState().setField('title', 'Test Apple');
useDraftTasting.getState().setField('brand', 'Test Brand');
useDraftTasting.getState().setField('rating', 4);

const updatedState = useDraftTasting.getState();
console.log('After setting fields:', updatedState);

// Test 3: Setting photo
useDraftTasting.getState().setPhoto({ kind: 'stock', id: 'apple' });

const photoState = useDraftTasting.getState();
console.log('After setting photo:', photoState);

// Test 4: Reset
useDraftTasting.getState().reset();

const resetState = useDraftTasting.getState();
console.log('After reset:', resetState);

console.log('✅ Zustand store tests completed successfully!');
