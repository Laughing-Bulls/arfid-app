// src/constants/categories.js
export const CATEGORY_OPTIONS = [
  'Fruits',
  'Vegetables',
  'Meats',
  'Seafood',
  'Grains',
  'Dairy',
  'Pastas',
  'Sauces',
  'Sweets',
  'Beverages',
  'Other',
];

export function normalizeCategory(value) {
  if (!value) return 'Other';
  const v = String(value).trim().toLowerCase();
  const found = CATEGORY_OPTIONS.find(c => c.toLowerCase() === v);
  return found || 'Other';
}

