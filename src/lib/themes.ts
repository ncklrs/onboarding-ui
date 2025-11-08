export interface OnboardingTheme {
  name: string
  primaryColor: string
  secondaryColor?: string
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  gradient?: string
  description?: string
}

export const premiumThemes: Record<string, OnboardingTheme> = {
  // Classic themes
  default: {
    name: 'Classic',
    primaryColor: '#000000',
    secondaryColor: '#374151',
    description: 'Clean black and white',
  },
  blue: {
    name: 'Ocean Blue',
    primaryColor: '#3b82f6',
    accentColor: '#60a5fa',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'Professional blue tones',
  },
  purple: {
    name: 'Royal Purple',
    primaryColor: '#a855f7',
    accentColor: '#c084fc',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'Elegant purple shades',
  },
  green: {
    name: 'Forest Green',
    primaryColor: '#22c55e',
    accentColor: '#4ade80',
    gradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
    description: 'Natural green palette',
  },
  red: {
    name: 'Vibrant Red',
    primaryColor: '#ef4444',
    accentColor: '#f87171',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    description: 'Bold red accent',
  },
  orange: {
    name: 'Sunset Orange',
    primaryColor: '#f97316',
    accentColor: '#fb923c',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    description: 'Warm orange tones',
  },

  // Premium gradients
  oceanBreeze: {
    name: 'Ocean Breeze',
    primaryColor: '#06b6d4',
    accentColor: '#22d3ee',
    gradient: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)',
    description: 'Cool cyan and blue',
  },
  sunsetGlow: {
    name: 'Sunset Glow',
    primaryColor: '#f59e0b',
    accentColor: '#fbbf24',
    gradient: 'linear-gradient(135deg, #FF512F 0%, #F09819 100%)',
    description: 'Warm sunset colors',
  },
  mintFresh: {
    name: 'Mint Fresh',
    primaryColor: '#10b981',
    accentColor: '#34d399',
    gradient: 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)',
    description: 'Fresh mint green',
  },
  lavenderDream: {
    name: 'Lavender Dream',
    primaryColor: '#c084fc',
    accentColor: '#e9d5ff',
    gradient: 'linear-gradient(135deg, #868f96 0%, #596164 100%)',
    description: 'Soft lavender hues',
  },

  // Dark themes
  midnight: {
    name: 'Midnight',
    primaryColor: '#6366f1',
    accentColor: '#818cf8',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    description: 'Dark midnight blue',
  },
  cyberpunk: {
    name: 'Cyberpunk',
    primaryColor: '#ec4899',
    accentColor: '#f472b6',
    backgroundColor: '#18181b',
    textColor: '#fafafa',
    gradient: 'linear-gradient(135deg, #FF61D2 0%, #FE9090 100%)',
    description: 'Neon cyberpunk vibes',
  },
  carbonFiber: {
    name: 'Carbon Fiber',
    primaryColor: '#64748b',
    accentColor: '#94a3b8',
    backgroundColor: '#020617',
    textColor: '#f1f5f9',
    gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    description: 'Sleek dark gray',
  },

  // Vibrant themes
  bubblegum: {
    name: 'Bubblegum',
    primaryColor: '#ec4899',
    accentColor: '#f9a8d4',
    gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    description: 'Sweet pink tones',
  },
  lemonade: {
    name: 'Lemonade',
    primaryColor: '#eab308',
    accentColor: '#fde047',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    description: 'Zesty yellow',
  },
  berry: {
    name: 'Berry',
    primaryColor: '#be123c',
    accentColor: '#fb7185',
    gradient: 'linear-gradient(135deg, #aa076b 0%, #61045f 100%)',
    description: 'Rich berry purple',
  },

  // Nature themes
  aurora: {
    name: 'Aurora',
    primaryColor: '#8b5cf6',
    accentColor: '#a78bfa',
    gradient: 'linear-gradient(135deg, #FEAC5E 0%, #C779D0 50%, #4BC0C8 100%)',
    description: 'Northern lights',
  },
  rainforest: {
    name: 'Rainforest',
    primaryColor: '#059669',
    accentColor: '#10b981',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    description: 'Lush green forest',
  },
  desert: {
    name: 'Desert',
    primaryColor: '#d97706',
    accentColor: '#f59e0b',
    gradient: 'linear-gradient(135deg, #EDC967 0%, #F4991E 100%)',
    description: 'Warm desert sand',
  },

  // Modern themes
  minimal: {
    name: 'Minimal',
    primaryColor: '#71717a',
    accentColor: '#a1a1aa',
    gradient: 'linear-gradient(135deg, #fafafa 0%, #e5e5e5 100%)',
    description: 'Ultra minimalist',
  },
  neon: {
    name: 'Neon',
    primaryColor: '#06b6d4',
    accentColor: '#22d3ee',
    gradient: 'linear-gradient(135deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)',
    description: 'Electric neon glow',
  },
  pastel: {
    name: 'Pastel',
    primaryColor: '#a78bfa',
    accentColor: '#c4b5fd',
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    description: 'Soft pastel colors',
  },
}

// Helper to get theme by name
export function getTheme(name: string): OnboardingTheme | undefined {
  return premiumThemes[name]
}

// Helper to get all theme names
export function getThemeNames(): string[] {
  return Object.keys(premiumThemes)
}

// Helper to get themes by category
export function getThemesByCategory() {
  return {
    classic: ['default', 'blue', 'purple', 'green', 'red', 'orange'],
    premium: ['oceanBreeze', 'sunsetGlow', 'mintFresh', 'lavenderDream'],
    dark: ['midnight', 'cyberpunk', 'carbonFiber'],
    vibrant: ['bubblegum', 'lemonade', 'berry'],
    nature: ['aurora', 'rainforest', 'desert'],
    modern: ['minimal', 'neon', 'pastel'],
  }
}

// Helper to apply theme
export function applyTheme(theme: OnboardingTheme, element?: HTMLElement) {
  const target = element || document.documentElement

  if (theme.primaryColor) {
    target.style.setProperty('--onboarding-primary', theme.primaryColor)
  }
  if (theme.secondaryColor) {
    target.style.setProperty('--onboarding-secondary', theme.secondaryColor)
  }
  if (theme.backgroundColor) {
    target.style.setProperty('--onboarding-bg', theme.backgroundColor)
  }
  if (theme.textColor) {
    target.style.setProperty('--onboarding-text', theme.textColor)
  }
  if (theme.accentColor) {
    target.style.setProperty('--onboarding-accent', theme.accentColor)
  }
}

// Generate CSS variables for a theme
export function generateThemeCSS(theme: OnboardingTheme): string {
  return `
    :root {
      ${theme.primaryColor ? `--onboarding-primary: ${theme.primaryColor};` : ''}
      ${theme.secondaryColor ? `--onboarding-secondary: ${theme.secondaryColor};` : ''}
      ${theme.backgroundColor ? `--onboarding-bg: ${theme.backgroundColor};` : ''}
      ${theme.textColor ? `--onboarding-text: ${theme.textColor};` : ''}
      ${theme.accentColor ? `--onboarding-accent: ${theme.accentColor};` : ''}
    }
  `
}
