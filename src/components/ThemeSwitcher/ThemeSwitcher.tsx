import React, { FC } from 'react';
import cn from 'clsx';
// import LightModeIcon from './NightIcon.svg';
// import DarkModeIcon from './SunIcon.svg';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeContext, Theme } from '../../theming';
import s from './ThemeSwitcher.module.sass';
import {useTheme} from "src/components/theme/Theme";

export type ThemeSwitcherProps = {
  className?: string;
};

const icons = {
  [Theme.light]: <DarkModeIcon />,
  [Theme.dark]: <LightModeIcon />,
};


export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }
  return (
    <button type="button" className={cn(s.root, className)} onClick={toggleTheme}>
      {icons[theme]}
    </button>
  );
};
