# Brave Bites Theme

## Overview
Brave Bites uses a vibrant and adventurous color scheme inspired by bold flavors and culinary exploration. The theme features three primary colors that work together to create an engaging and appetizing user experience.

## Color Palette

### Primary Colors
- **Orange (#FF6B35)** - Primary brand color, represents energy and creativity
- **Teal (#00B4D8)** - Secondary color, represents freshness and innovation  
- **Yellow (#FFD23F)** - Accent color, represents warmth and optimism

### Color Variations
- **Primary Light (#FF8A65)** - Lighter orange for subtle highlights
- **Primary Dark (#E55A2B)** - Darker orange for emphasis
- **Secondary Light (#48CAE4)** - Lighter teal for backgrounds
- **Secondary Dark (#0096C7)** - Darker teal for text
- **Accent Light (#FFE066)** - Lighter yellow for subtle accents
- **Accent Dark (#F4C430)** - Darker yellow for emphasis

### Neutral Colors
- **White (#FFFFFF)** - Pure white for backgrounds
- **Black (#000000)** - Pure black for text
- **Gray (#6C757D)** - Medium gray for secondary text
- **Light Gray (#F8F9FA)** - Light gray for surfaces
- **Dark Gray (#343A40)** - Dark gray for emphasis

## Usage Guidelines

### Recipe Cards
- Background: White
- Border: Light gray
- Title: Dark text
- Category: Teal

### Buttons
- Primary buttons: Orange background with white text
- Secondary buttons: Teal background with white text
- Accent buttons: Yellow background with dark text

### Navigation
- Background: Orange
- Text: White
- Active state: Yellow

### Search
- Background: Light gray
- Border: Light gray
- Text: Dark text

### Splash Screen
- Background: Orange
- Text: White
- Tagline: Yellow

## Implementation

The theme is implemented using a centralized color system:

```javascript
import { colors, colorSchemes } from '../theme/colors';

// Use individual colors
backgroundColor: colors.primary

// Use predefined color schemes
backgroundColor: colorSchemes.recipeCard.background
```

## Accessibility

The color combinations have been tested for sufficient contrast ratios to ensure readability for users with visual impairments. The orange, teal, and yellow combination provides good contrast while maintaining the vibrant aesthetic.

## Brand Identity

The Brave Bites theme reflects:
- **Adventure** - Bold orange represents culinary exploration
- **Freshness** - Teal represents fresh ingredients and innovation
- **Warmth** - Yellow represents the joy of cooking and sharing meals

This color scheme creates an inviting and exciting atmosphere that encourages users to try new recipes and embrace culinary adventures.

