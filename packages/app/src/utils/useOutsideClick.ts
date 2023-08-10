import { useCallback, useEffect } from 'react'

// adapted from https://stackoverflow.com/a/42234988/7956924
export const useOutsideClick = ({ ref, callback }: { ref: any; callback: () => void }): void => {
  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      if (!ref.current) {
        return
      }

      const wasClickedOutside = !ref.current.contains(event.target)

      if (wasClickedOutside) {
        callback()
      }
    },
    [callback, ref],
  )

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown)

    return () => {
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [onMouseDown])
}
