/**
 * Material-UI theme configuration
 * Aikido-inspired design with red/navy color palette
 */

import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      beltColors: {
        white_5: string
        white_4: string
        white_3: string
        white_2: string
        white_1: string
        black_1: string
        black_2: string
        black_3: string
        black_4: string
      }
    }
  }
  interface ThemeOptions {
    custom?: {
      beltColors?: {
        white_5: string
        white_4: string
        white_3: string
        white_2: string
        white_1: string
        black_1: string
        black_2: string
        black_3: string
        black_4: string
      }
    }
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#26a69a', // Teal
      light: '#64d8cb',
      dark: '#00766c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4fc3f7', // Light Blue
      light: '#8bf6ff',
      dark: '#0093c4',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    success: {
      main: '#66bb6a', // Green
      light: '#98ee99',
      dark: '#338a3e',
    },
    warning: {
      main: '#ffa726', // Orange
      light: '#ffd95b',
      dark: '#c77800',
    },
    error: {
      main: '#ff9800', // Dark Orange for error, avoiding red
      light: '#ffc947',
      dark: '#c66900',
    },
    info: {
      main: '#29b6f6', // Light Blue
      light: '#73e8ff',
      dark: '#0086c3',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2a2a2a',
    },
    text: {
      primary: '#e0e0e0',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  },

  typography: {
    fontFamily: '"Noto Sans JP", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.1rem',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
      color: 'rgba(255, 255, 255, 0.7)',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      color: 'rgba(255, 255, 255, 0.7)',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      color: 'rgba(255, 255, 255, 0.7)',
    },
    button: {
      fontSize: '0.9rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.5px',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      color: 'rgba(255, 255, 255, 0.5)',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      lineHeight: 2.66,
      letterSpacing: '1px',
    },
  },

  shape: {
    borderRadius: 16,
  },

  spacing: 8,

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(180deg, #1a1a1a 0%, #121212 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 500
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
          }
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12
        },
        elevation1: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 8
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500
        }
      }
    }
  },

  custom: {
    beltColors: {
      white_5: '#ffffff',   // 5th-4th Kyu: White
      white_4: '#ffffff',
      white_3: '#fdd835',   // 3rd-2nd Kyu: Yellow
      white_2: '#fdd835',
      white_1: '#fb8c00',   // 1st Kyu: Orange
      black_1: '#212121',   // 1st Dan+: Black
      black_2: '#212121',
      black_3: '#212121',
      black_4: '#212121'
    }
  }
})

export default theme
