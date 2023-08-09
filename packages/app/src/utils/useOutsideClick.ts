import { MouseEvent, RefObject, useCallback, useEffect } from 'react'

// adapted from https://stackoverflow.com/a/42234988/7956924
export const useOutsideClick = <T>({ ref, callback }: { ref: RefObject<T>; callback: () => void }): void => {
  const onMouseDown = useCallback(
    (event: MouseEvent<T>) => {
      if (!ref.current) {
        return
      }

      // @ts-expect-error FIXME:
      const wasClickedOutside = !ref.current.contains(event.target)

      if (wasClickedOutside) {
        callback()
      }
    },
    [callback, ref],
  )

  useEffect(() => {
    // @ts-expect-error FIXME
    document.addEventListener('mousedown', onMouseDown)

    return () => {
      // @ts-expect-error FIXME
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [onMouseDown])
}
