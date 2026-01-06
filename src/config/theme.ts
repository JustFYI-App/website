/**
 * Theme Utilities
 *
 * Generates CSS custom properties from the site configuration.
 * Ensures consistent theming across the entire site.
 */

import { siteConfig } from './site';

/**
 * Typography configuration
 * Using system font stack for optimal performance (no external fonts)
 */
export const typography = {
  fontFamily: {
    // System font stack - uses native fonts for each OS
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  },
  // Type scale (1.25 ratio - Major Third)
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};

/**
 * Spacing scale (based on 4px grid)
 */
export const spacing = {
  px: '1px',
  '0': '0',
  '0.5': '0.125rem',   // 2px
  '1': '0.25rem',      // 4px
  '1.5': '0.375rem',   // 6px
  '2': '0.5rem',       // 8px
  '2.5': '0.625rem',   // 10px
  '3': '0.75rem',      // 12px
  '3.5': '0.875rem',   // 14px
  '4': '1rem',         // 16px
  '5': '1.25rem',      // 20px
  '6': '1.5rem',       // 24px
  '7': '1.75rem',      // 28px
  '8': '2rem',         // 32px
  '9': '2.25rem',      // 36px
  '10': '2.5rem',      // 40px
  '11': '2.75rem',     // 44px (minimum touch target)
  '12': '3rem',        // 48px
  '14': '3.5rem',      // 56px
  '16': '4rem',        // 64px
  '20': '5rem',        // 80px
  '24': '6rem',        // 96px
  '28': '7rem',        // 112px
  '32': '8rem',        // 128px
};

/**
 * Border radius values
 */
export const borderRadius = {
  none: '0',
  sm: '0.125rem',      // 2px
  default: '0.25rem',  // 4px
  md: '0.375rem',      // 6px
  lg: '0.5rem',        // 8px
  xl: '0.75rem',       // 12px
  '2xl': '1rem',       // 16px
  '3xl': '1.5rem',     // 24px
  full: '9999px',
};

/**
 * Shadow values
 */
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

/**
 * Transition durations
 */
export const transitions = {
  fast: '150ms',
  default: '200ms',
  slow: '300ms',
  slower: '500ms',
};

/**
 * Breakpoints for responsive design
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/**
 * Generate CSS custom properties string from configuration
 */
export function generateCSSCustomProperties(): string {
  const { colors } = siteConfig;

  return `
  /* Colors - Generated from site configuration */
  --color-primary: ${colors.primary};
  --color-primary-dark: ${colors.primaryDark};
  --color-primary-light: ${colors.primaryLight};
  --color-secondary: ${colors.secondary};
  --color-secondary-dark: ${colors.secondaryDark};
  --color-accent: ${colors.accent};

  --color-text-primary: ${colors.text.primary};
  --color-text-secondary: ${colors.text.secondary};
  --color-text-muted: ${colors.text.muted};
  --color-text-inverse: ${colors.text.inverse};

  --color-bg-primary: ${colors.background.primary};
  --color-bg-secondary: ${colors.background.secondary};
  --color-bg-tertiary: ${colors.background.tertiary};

  --color-border: ${colors.border};
  --color-success: ${colors.success};
  --color-warning: ${colors.warning};
  --color-error: ${colors.error};

  /* Typography */
  --font-sans: ${typography.fontFamily.sans};
  --font-mono: ${typography.fontFamily.mono};

  --text-xs: ${typography.fontSize.xs};
  --text-sm: ${typography.fontSize.sm};
  --text-base: ${typography.fontSize.base};
  --text-lg: ${typography.fontSize.lg};
  --text-xl: ${typography.fontSize.xl};
  --text-2xl: ${typography.fontSize['2xl']};
  --text-3xl: ${typography.fontSize['3xl']};
  --text-4xl: ${typography.fontSize['4xl']};
  --text-5xl: ${typography.fontSize['5xl']};
  --text-6xl: ${typography.fontSize['6xl']};

  --font-normal: ${typography.fontWeight.normal};
  --font-medium: ${typography.fontWeight.medium};
  --font-semibold: ${typography.fontWeight.semibold};
  --font-bold: ${typography.fontWeight.bold};

  --leading-tight: ${typography.lineHeight.tight};
  --leading-snug: ${typography.lineHeight.snug};
  --leading-normal: ${typography.lineHeight.normal};
  --leading-relaxed: ${typography.lineHeight.relaxed};
  --leading-loose: ${typography.lineHeight.loose};

  /* Spacing */
  --space-px: ${spacing.px};
  --space-0: ${spacing['0']};
  --space-0-5: ${spacing['0.5']};
  --space-1: ${spacing['1']};
  --space-1-5: ${spacing['1.5']};
  --space-2: ${spacing['2']};
  --space-2-5: ${spacing['2.5']};
  --space-3: ${spacing['3']};
  --space-3-5: ${spacing['3.5']};
  --space-4: ${spacing['4']};
  --space-5: ${spacing['5']};
  --space-6: ${spacing['6']};
  --space-7: ${spacing['7']};
  --space-8: ${spacing['8']};
  --space-9: ${spacing['9']};
  --space-10: ${spacing['10']};
  --space-11: ${spacing['11']};
  --space-12: ${spacing['12']};
  --space-14: ${spacing['14']};
  --space-16: ${spacing['16']};
  --space-20: ${spacing['20']};
  --space-24: ${spacing['24']};
  --space-28: ${spacing['28']};
  --space-32: ${spacing['32']};

  /* Border Radius */
  --radius-none: ${borderRadius.none};
  --radius-sm: ${borderRadius.sm};
  --radius: ${borderRadius.default};
  --radius-md: ${borderRadius.md};
  --radius-lg: ${borderRadius.lg};
  --radius-xl: ${borderRadius.xl};
  --radius-2xl: ${borderRadius['2xl']};
  --radius-3xl: ${borderRadius['3xl']};
  --radius-full: ${borderRadius.full};

  /* Shadows */
  --shadow-sm: ${shadows.sm};
  --shadow: ${shadows.default};
  --shadow-md: ${shadows.md};
  --shadow-lg: ${shadows.lg};
  --shadow-xl: ${shadows.xl};

  /* Transitions */
  --transition-fast: ${transitions.fast};
  --transition: ${transitions.default};
  --transition-slow: ${transitions.slow};
  --transition-slower: ${transitions.slower};

  /* Breakpoints (for reference - use in media queries) */
  --bp-sm: ${breakpoints.sm};
  --bp-md: ${breakpoints.md};
  --bp-lg: ${breakpoints.lg};
  --bp-xl: ${breakpoints.xl};
  --bp-2xl: ${breakpoints['2xl']};

  /* Layout */
  --max-width-content: 1200px;
  --max-width-prose: 65ch;
  --min-touch-target: 44px;
`;
}

/**
 * Color contrast checking utilities
 * These help ensure WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
 */

/**
 * Convert hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance for a color
 */
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA requirements
 */
export function meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

export default {
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  generateCSSCustomProperties,
  hexToRgb,
  getLuminance,
  getContrastRatio,
  meetsWCAGAA,
};
