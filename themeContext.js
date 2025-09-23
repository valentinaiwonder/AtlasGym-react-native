import React, { createContext, useState, useContext } from 'react';

const lightColors = {
    background: "#ffffff",
    text: "#000000",
    textBlack: "#000000",
    textWhite: "#ffffff",
    secondaryText: "#666666",
    accent: "#9f7aea",
    inputBackground: "#f2f2f2",
    inputBorder: "#9f7aea",
    modalBackground: "#ffffff",
};

const darkColors = {
    background: "#000000",
    text: "#ffffff",
    textBlack: "#000000",
    textWhite: "#ffffff",
    secondaryText: "#cccccc",
    accent: "#dba2ff",
    inputBackground: "#1a1a1a",
    inputBorder: "#9f7aea",
    modalBackground: "#2d2d2d",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const theme = isDarkTheme ? darkColors : lightColors;

    const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};