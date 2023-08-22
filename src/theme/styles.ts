import { mode, type StyleFunctionProps } from '@chakra-ui/theme-tools'
export const globalStyles = {
  colors: {
    black: '#16161D',
    bg: {
      light: '#FFFFFF',
      dark: '#2D3748'
    },
    light: {
      white: '#FFFFFF',
      dark: '#2D3748'
    },
    brand: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3182CE',
      600: '#2B6CB0',
      700: '#2C5282',
      800: '#2A4365',
      900: '#1A365D'
    },
    brandScheme: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3182CE',
      600: '#2B6CB0',
      700: '#2C5282',
      800: '#2A4365',
      900: '#1A365D'
    },
    secondaryGray: {
      100: '#E0E5F2',
      200: '#E1E9F8',
      300: '#F4F7FE',
      400: '#E9EDF7',
      500: '#8F9BBA',
      600: '#A3AED0',
      700: '#707EAE',
      800: '#707EAE',
      900: '#1B2559'
    },
    red: {
      100: '#FEEFEE',
      500: '#EE5D50',
      600: '#E31A1A'
    },
    blue: {
      50: '#EFF4FB',
      500: '#3965FF'
    },
    orange: {
      100: '#FFF6DA',
      500: '#FFB547'
    },
    green: {
      100: '#E6FAF5',
      500: '#01B574'
    },
    gray: {
      100: '#FAFCFE'
    }
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      'html, body': {
        overflowX: 'hidden',
        bg: mode('secondaryGray.300', 'gray.900')(props),
        fontFamily: 'DM Sans',
        fontSize: '14px',
        letterSpacing: '-0.5px'
      },
      input: {
        color: 'gray.700'
      },
      html: {
        fontFamily: 'DM Sans'
      }
    })
  }
}
