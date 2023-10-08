import React, { FC } from 'react';
import cn from 'clsx';
// import LightModeIcon from './NightIcon.svg';
// import DarkModeIcon from './SunIcon.svg';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// eslint-disable-next-line import/no-unresolved

import s from './ThemeSwitcher.module.sass';
import { useTheme } from '../theme/Theme';
import { Theme } from 'src/theming/types';

export type ThemeSwitcherProps = {
  className?: string;
};

const icons = {
  [Theme.green]: <DarkModeIcon />,
  [Theme.blue]: <LightModeIcon />,
};

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    console.log(theme)
    if (theme === 'green') {
      setTheme('blue');
    } else {
      setTheme('green');
    }
  };
  return (
    <button type="button" className={cn(s.root, className)} onClick={toggleTheme}>
      {icons[theme]}
    </button>
  );
};
