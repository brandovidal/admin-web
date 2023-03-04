import type { BaseBreakpointConfig, Breakpoints } from '@chakra-ui/theme-tools'

export const createBreakpoints = <T extends Partial<BaseBreakpointConfig>>(config: T): Breakpoints<T> => {
  return { base: '0em', ...config }
}

export const breakpoints = createBreakpoints({
  base: '0em',
  sm: '320px',
  '2sm': '380px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1600px',
  '3xl': '1920px'
})
