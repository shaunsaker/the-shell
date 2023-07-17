import { useEffect } from 'react'

export const useKeypress = (key: string, cb: () => void) => {
  useEffect(() => {
    const onKeyup = (event: KeyboardEvent) => {
      if (event.key === key) {
        cb()
      }
    }
    window.addEventListener('keyup', onKeyup)

    return () => window.removeEventListener('keyup', onKeyup)
  }, [cb, key])
}
