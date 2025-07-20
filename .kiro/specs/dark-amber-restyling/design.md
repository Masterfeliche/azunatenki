# Design Document

## Overview

The Azu musician website will be restyled with a dark background and amber gold color scheme to create a more visually striking and immersive experience. The design will maintain the existing functionality while enhancing the visual appeal through consistent use of dark backgrounds and amber gold accents throughout the site.

## Color Palette

### Primary Colors
- **Dark Background Colors**
  - Primary Background: `#0F0F0F` (very dark gray, almost black)
  - Secondary Background: `#1A1A1A` (dark gray)
  - Tertiary Background: `#2A2A2A` (medium-dark gray)
  
- **Amber Gold Accent Colors**
  - Primary Amber: `#F59E0B` (amber-500)
  - Light Amber: `#FBBF24` (amber-400)
  - Dark Amber: `#D97706` (amber-600)
  - Amber Glow: `#FEF3C7` (amber-100, for subtle highlights)

### Text Colors
- Primary Text: `#FFFFFF` (white, for headings and important text)
- Secondary Text: `#E5E5E5` (light gray, for body text)
- Tertiary Text: `#A3A3A3` (medium gray, for less important text)
- Amber Text: `#F59E0B` (amber-500, for accents and highlights)

### Functional Colors
- Success: `#10B981` (green-500)
- Error: `#EF4444` (red-500)
- Warning: `#F59E0B` (amber-500)
- Info: `#3B82F6` (blue-500)

## Typography

The existing typography will be maintained, with adjustments to color and contrast:

- **Headings**: Font-family: 'Playfair Display', serif
  - Color: `#FFFFFF` (white)
  - Accents: `#F59E0B` (amber-500)

- **Body Text**: Font-family: 'Inter', sans-serif
  - Primary Color: `#E5E5E5` (light gray)
  - Secondary Color: `#A3A3A3` (medium gray)

## Component Styling

### Navigation
- Background: `#0F0F0F` with 50% opacity and backdrop blur
- Active/Hover Links: `#F59E0B` (amber-500)
- Default Links: `#FFFFFF` (white)
- Mobile Menu: `#1A1A1A` background with `#F59E0B` accents

### Buttons
- Primary Button:
  - Background: `#F59E0B` (amber-500)
  - Hover: `#FBBF24` (amber-400)
  - Text: `#0F0F0F` (dark gray)
  
- Secondary Button:
  - Background: Transparent
  - Border: `#F59E0B` (amber-500)
  - Text: `#F59E0B` (amber-500)
  - Hover: Background `#F59E0B` with text `#0F0F0F`

### Cards and Sections
- Background: `#1A1A1A` (dark gray)
- Border: `#2A2A2A` (medium-dark gray)
- Hover Border: `#F59E0B` (amber-500)
- Section Dividers: Gradients using amber colors

### Audio Player
- Background: `#0F0F0F` with 90% opacity
- Controls: `#F59E0B` (amber-500)
- Progress Bar: 
  - Background: `#2A2A2A` (medium-dark gray)
  - Filled: `#F59E0B` (amber-500)
- Volume Slider: Styled with amber accents

### Forms
- Input Background: `#2A2A2A` (medium-dark gray)
- Input Border: `#3A3A3A` (lighter dark gray)
- Focus Border: `#F59E0B` (amber-500)
- Placeholder Text: `#A3A3A3` (medium gray)

## Visual Effects

### Gradients
- Amber Gradient: `linear-gradient(to right, #F59E0B, #FBBF24)`
- Dark Gradient: `linear-gradient(to bottom, #0F0F0F, #1A1A1A)`
- Section Divider: `linear-gradient(to right, transparent, #F59E0B, transparent)`

### Shadows
- Card Shadow: `0 4px 6px rgba(0, 0, 0, 0.5)`
- Elevated Elements: `0 10px 15px -3px rgba(0, 0, 0, 0.5)`
- Amber Glow: `0 0 15px rgba(245, 158, 11, 0.5)` (for hover effects)

### Animations and Transitions
- Hover Transitions: 200ms ease-in-out
- Color Transitions: 300ms ease
- Transform Transitions: 200ms cubic-bezier(0.4, 0, 0.2, 1)

## Section-Specific Styling

### Hero Section
- Full dark background with subtle texture
- Amber gradient for divider elements
- White text with amber accents
- Call-to-action buttons with amber styling

### Music Section
- Album cards with dark background
- Amber borders on hover
- Play buttons with amber styling
- Track listings with amber hover effects

### About/Story Section
- Dark background with subtle amber gradient accents
- Timeline elements with amber highlights
- Images with dark borders and amber accents
- Social media icons in amber on hover

### Newsletter Section
- Dark background with subtle amber pattern
- Form elements with amber focus states
- Submit button with amber styling
- Success messages with amber accents

### Footer
- Dark background with amber text accents
- Social icons with amber hover effects
- Links with amber hover states

## Accessibility Considerations

- Ensure all text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Provide visible focus states with amber highlights for keyboard navigation
- Maintain readability of all text against dark backgrounds
- Use amber accents strategically to highlight important UI elements without causing visual fatigue

## Implementation Approach

1. Update the Tailwind configuration with the new color palette
2. Modify the CSS custom properties for colors
3. Update component styling throughout the site
4. Test across different devices and screen sizes
5. Validate accessibility compliance

## Responsive Design

The dark background and amber gold styling will be consistent across all screen sizes, with appropriate adjustments:

- Mobile: Simplified layouts with consistent dark/amber styling
- Tablet: Optimized spacing with the same color scheme
- Desktop: Full experience with subtle amber effects and animations

## Performance Considerations

- Use CSS variables for consistent color application
- Minimize use of complex shadows on mobile devices
- Optimize amber glow effects for performance
- Ensure smooth transitions without jank