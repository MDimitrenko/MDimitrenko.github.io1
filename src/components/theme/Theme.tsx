import React, { useEffect, createContext, useState, useContext, FC } from 'react';

const StorageKey = 'features-color-theme';
const supportedThemes = {
  green: 'green',
  blue: 'blue',
};

type Themes = keyof typeof supportedThemes;
console.log('ddd');
const ThemeContext = createContext<
  | {
      theme: Themes;
      setTheme: (theme: Themes) => void;
      supportedThemes: { [key: string]: string };
    }
  | undefined
>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('You can use "useTheme" hook only within a <ThemeProvider> component.');
  }

  return context;
};

const getTheme = (): Themes => {
  let theme = localStorage.getItem(StorageKey);

  if (!theme) {
    localStorage.setItem(StorageKey, 'green');
    theme = 'blue';
  }

  return theme as Themes;
};

interface ThemeProps {
  children: React.ReactNode;
}
const Theme: FC<ThemeProps> = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(getTheme);

  useEffect(() => {
    localStorage.setItem(StorageKey, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        supportedThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Theme.SimpleToggler = function SimpleToggler() {
//     const { theme, setTheme } = useTheme();
//
//     const handleSwitchTheme = () => {
//         if (theme === 'dark') {
//             setTheme('light');
//         } else {
//             setTheme('dark');
//         }
//     };
//
//     return (
//         <div className={Styles.simpleToggler} onClick={handleSwitchTheme}>
//             <div className={Styles.ball} data-theme={theme} />
//         </div>
//     );
// };

export { useTheme };
export default Theme;
