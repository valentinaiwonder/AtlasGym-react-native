
import React, { createContext, useContext, useState } from "react";
import { lightColors, darkColors } from "./colors";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(true);
    const colors = isDark ? darkColors : lightColors;

    const toggleTheme = () => setIsDark(!isDark); // alterna tema

    return (
        <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
