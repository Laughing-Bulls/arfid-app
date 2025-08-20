// Brave Bites Theme Colors
export const colors = {
  // Primary Colors
  primary: '#FF6B35',      // Vibrant Orange
  secondary: '#00B4D8',    // Teal
  accent: '#FFD23F',       // Yellow
  
  // Variations
  primaryLight: '#FF8A65', // Lighter Orange
  primaryDark: '#E55A2B',  // Darker Orange
  secondaryLight: '#48CAE4', // Lighter Teal
  secondaryDark: '#0096C7',  // Darker Teal
  accentLight: '#FFE066',    // Lighter Yellow
  accentDark: '#F4C430',     // Darker Yellow
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#6C757D',
  lightGray: '#F8F9FA',
  darkGray: '#343A40',
  
  // Background Colors
  background: '#FFFFFF',
  surface: '#F8F9FA',
  card: '#FFFFFF',
  
  // Text Colors
  textPrimary: '#212529',
  textSecondary: '#6C757D',
  textLight: '#ADB5BD',
  
  // Status Colors
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',
  
  // Border Colors
  border: '#E9ECEF',
  borderLight: '#F1F3F4',
  
  // Shadow Colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
};

// Color combinations for different UI elements
export const colorSchemes = {
  // Recipe Cards
  recipeCard: {
    background: colors.white,
    border: colors.border,
    title: colors.textPrimary,
    category: colors.secondary,
  },
  
  // Buttons
  button: {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    text: colors.white,
  },
  
  // Navigation
  navigation: {
    background: colors.primary,
    text: colors.white,
    active: colors.accent,
  },
  
  // Search
  search: {
    background: colors.lightGray,
    border: colors.border,
    text: colors.textPrimary,
  },
  
  // Splash Screen
  splash: {
    background: colors.primary,
    text: colors.white,
  },
};

