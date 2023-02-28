import { type IRoute } from '@/types/navigation'

import isEmpty from 'just-is-empty'

// NextJS Requirement
export const isWindowAvailable = (): boolean => typeof window !== 'undefined'

export const findCurrentRoute = (routes: IRoute[]): IRoute => {
  const foundRoute: IRoute = routes.find(
    (route) =>
      isWindowAvailable() &&
      window.location.href.includes(route.layout + route.path) &&
      route
  ) as IRoute

  return foundRoute
}

export const getActiveRoute = (routes: IRoute[]): string => {
  const route = findCurrentRoute(routes)
  return route?.name ?? 'Default Brand Text'
}

export const getActiveNavbar = (routes: IRoute[]): boolean => {
  const route = findCurrentRoute(routes)
  return route?.secondary ?? false
}

export const getActiveNavbarText = (routes: IRoute[]): boolean => {
  return isEmpty(getActiveRoute(routes)) || false
}
