import { useEffect, useState } from 'react'

export const useOutsideElement = (ref: any) => {
    const [outside, setOutside] = useState(false)

    useEffect(() => {
        function handleClickOutside (event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOutside(true)
            } else {
                setOutside(false)
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])

    return outside
}
