import { HomeModernIcon } from '@heroicons/react/24/outline'
import { atom as atomPrimitive, useAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { routes } from '../../routes'

type NavigationItem = {
  name: string
  href: string
  icon: any
  current: boolean
}

const navigation = [{ name: 'Dashboard', href: routes.dashboard, icon: HomeModernIcon, current: true }]

const atom = atomPrimitive<NavigationItem[]>(navigation)

const useNavigationAtom = () => useAtom(atom)

export const useNavigation = () => {
  const [navigation, setNavigation] = useNavigationAtom()
  const location = useLocation()

  // when the location changes, update navigation to reflect the current page
  useEffect(
    () => {
      const newNavigation = navigation.map(item => ({
        ...item,
        current: item.href === location.pathname,
      }))

      setNavigation(newNavigation)
    },
    // we intentionally ignore the navigation dependency
    // eslint-disable-next-line
    [location, setNavigation]
  )

  return [navigation, setNavigation] as const
}
