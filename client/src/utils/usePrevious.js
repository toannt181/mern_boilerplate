import { useRef, useEffect } from 'react'

export default function usePrevious(value) {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
    console.log('update', value)
  }, [value])

  return ref.current
}