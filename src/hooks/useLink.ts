import { useCallback } from 'react'

export const useLink = () => {
  const link = useCallback((to: string, target?: '_blank') => {
    window.open(to, target)
  }, [])

  return link
}
