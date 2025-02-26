import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  changeTheme: (theme: Theme) => void
}

// Provide a default implementation for changeTheme
const defaultState: ThemeProviderState = {
  theme: "dark",
  changeTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(defaultState)

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  const updateTheme = (theme: Theme) => {
    setTheme(theme)
  }

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    localStorage.setItem(storageKey, theme)
    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeProviderContext.Provider {...props} value={{ theme, changeTheme: updateTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (!context)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}