import { createContext, useContext, useEffect, useState } from "react"

type ThemeProviderContext = {
  theme: string
  setTheme: (theme: string) => void
}

const ThemeProviderContext = createContext<ThemeProviderContext | undefined>(
  undefined
)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  ...props
}: {
  children: React.ReactNode
  defaultTheme?: string
  [key: string]: any
}) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  const handleSetTheme = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      <div {...props}>{children}</div>
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
