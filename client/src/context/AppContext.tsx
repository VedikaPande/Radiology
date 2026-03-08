import { createContext, useContext, useState, type ReactNode } from "react";

interface ThemeContextType {
  dark: boolean;
  toggleDark: () => void;
}

interface SidebarContextType {
  open: boolean;
  toggleSidebar: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggleDark: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const SidebarContext = createContext<SidebarContextType>({
  open: true,
  toggleSidebar: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function AppProviders({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(true);

  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      document.body.classList.toggle("dark", next);
      return next;
    });
  };

  const toggleSidebar = () => setOpen((o) => !o);

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      <SidebarContext.Provider value={{ open, toggleSidebar }}>
        {children}
      </SidebarContext.Provider>
    </ThemeContext.Provider>
  );
}
