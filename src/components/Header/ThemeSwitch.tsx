import { useState, useEffect, FC, ReactNode } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

const ThemeSwitch: FC<{children?: ReactNode}> = ({ children }) => {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    const toggled_theme = () => {
        return resolvedTheme === 'light' ? 'dark' : 'light';
    }

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <button className="flex flex-1 justify-center items-center hover:text-primary transition-all" title="Toggle Theme" onClick={() => { setTheme(toggled_theme()) }}>
            { children ?? (resolvedTheme === 'light' ? <MoonIcon height="32px" /> : <SunIcon height="32px" />) }
        </button>
    )
}

export default ThemeSwitch