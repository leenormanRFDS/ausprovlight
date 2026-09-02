/**
 * AUSTRALIAN PROVENANCE PROJECT — DESIGN TOKENS
 * Developed by Dr. Mara Voss (Creative Direction) & Elliot Zhang (Creative Technology)
 * 
 * Aesthetic Archetype: Future Australian Cultural Institution / Field Laboratory / Digital Archive
 * Strict Non-Aesthetic: No generic SaaS gradients, Web3 glow slop, AI cyan, or corporate consulting templates.
 */

export const APP_TOKENS = {
  // 1. COLOUR TERRITORIES
  colors: {
    // Obsidian: Deep subterranean and cosmological voids
    obsidian: {
      void: '#050505',
      base: '#0A0A0A',
      surface: '#121210',
      elevated: '#181815',
      border: 'rgba(242, 240, 235, 0.08)',
      borderActive: 'rgba(197, 160, 89, 0.40)',
    },
    // Bone: Ancient limestone, marine fossils, bleached field parchment
    bone: {
      bright: '#FFFFFF',
      primary: '#F5F3ED',
      muted: '#D4D0C8',
      faint: '#8E8A82',
    },
    // Sandstone & Geological Earth: Ironstone matrix, desert regolith, and sedimentary beds
    sandstone: {
      matrix: '#1E1B16',
      ironstone: '#2A241C',
      ochre: '#453B2F',
      dust: '#6E6250',
      pale: '#A39580',
    },
    // Provenance Gold: The singular verification anchor (used strictly for truth, standard thresholds, and immutable signals)
    provenance: {
      gold: '#C5A059',
      goldMuted: '#967A43',
      goldGlow: 'rgba(197, 160, 89, 0.25)',
      goldBorder: 'rgba(197, 160, 89, 0.50)',
      goldDeep: '#3D311A',
    },
    // Spectral Matrix: Rare material refraction (optical physical phenomena, NOT arbitrary gradients)
    spectral: {
      glintBlue: '#5C7D91',
      glintGreen: '#456B5A',
      glintFire: '#9E4E3B',
      glintViolet: '#6A5675',
    },
    // Verification States
    status: {
      verified: '#8FA382',
      consensus: '#C5A059',
      pending: '#7A756D',
      restricted: '#9E4E3B',
    }
  },

  // 2. TYPOGRAPHIC SYSTEM
  typography: {
    fonts: {
      display: '"Montserrat", -apple-system, sans-serif',
      editorial: '"Cormorant Garamond", Georgia, serif',
      mono: '"JetBrains Mono", monospace',
    },
    // Extreme Scale Contrast (Major Second / Perfect Fourth dynamic pairings)
    scales: {
      display: {
        '3xl': { size: 'clamp(2.5rem, 6vw, 4.5rem)', tracking: '0.18em', leading: '1.05', weight: '200' },
        '2xl': { size: 'clamp(1.75rem, 4vw, 3rem)', tracking: '0.22em', leading: '1.1', weight: '300' },
        'xl': { size: 'clamp(1.25rem, 2.5vw, 1.875rem)', tracking: '0.25em', leading: '1.2', weight: '300' },
        'lg': { size: '1.125rem', tracking: '0.2em', leading: '1.3', weight: '400' },
        'base': { size: '0.875rem', tracking: '0.25em', leading: '1.4', weight: '400' },
      },
      editorial: {
        'hero': { size: 'clamp(1.5rem, 3.2vw, 2.5rem)', leading: '1.4', style: 'italic', weight: '400' },
        'lead': { size: 'clamp(1.125rem, 1.8vw, 1.5rem)', leading: '1.6', style: 'italic', weight: '400' },
        'body': { size: '1rem', leading: '1.7', style: 'normal', weight: '400' },
        'quote': { size: '1.125rem', leading: '1.65', style: 'italic', weight: '500' },
      },
      mono: {
        'lg': { size: '0.875rem', tracking: '0.15em', leading: '1.5' },
        'base': { size: '0.75rem', tracking: '0.18em', leading: '1.5' },
        'sm': { size: '0.6875rem', tracking: '0.2em', leading: '1.4' },
        'xs': { size: '0.5625rem', tracking: '0.25em', leading: '1.3' },
        'micro': { size: '0.5rem', tracking: '0.3em', leading: '1.2' },
      }
    }
  },

  // 3. SPATIAL & GRID SYSTEM
  spacing: {
    base: 4, // 4px baseline
    rhythm: {
      hairline: '1px',
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
      '3xl': '64px',
      '4xl': '96px',
      '5xl': '128px',
    },
    container: 'max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16',
  },

  // 4. ARCHITECTURAL BOUNDARIES & RADII
  // Rigid museum/laboratory discipline: strictly 0px to 2px, never puffy pill containers
  borders: {
    hairline: '1px solid rgba(242, 240, 235, 0.08)',
    subtle: '1px solid rgba(242, 240, 235, 0.14)',
    active: '1px solid rgba(197, 160, 89, 0.40)',
    goldSolid: '1px solid #C5A059',
    dashed: '1px dashed rgba(242, 240, 235, 0.15)',
  },
  radii: {
    none: '0px',
    plate: '1px',
    tag: '2px',
  },

  // 5. MOTION TIMINGS
  motion: {
    transitionInstant: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
    transitionStandard: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    transitionGeological: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
  }
} as const;

export type AppTokens = typeof APP_TOKENS;
