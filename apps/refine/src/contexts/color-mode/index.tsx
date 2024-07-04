'use client';

import React, {
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { RefineThemes } from '@refinedev/antd';
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import Cookies from 'js-cookie';

type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

type ColorModeContextProviderProps = {
  defaultMode?: string;
};

export const ColorModeContextProvider: React.FC<
  PropsWithChildren<ColorModeContextProviderProps>
> = ({ children, defaultMode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState(defaultMode || 'light');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const theme = Cookies.get('theme') || 'light';
      setMode(theme);
    }
  }, [isMounted]);

  const setColorMode = () => {
    if (mode === 'light') {
      setMode('dark');
      Cookies.set('theme', 'dark');
    } else {
      setMode('light');
      Cookies.set('theme', 'light');
    }
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider
        // you can change the theme colors here. example: ...RefineThemes.Magenta,
        theme={{
          ...RefineThemes.Blue,
          algorithm: mode === 'light' ? defaultAlgorithm : darkAlgorithm,
          token: {
            colorPrimary: mode === 'light' ? '#03516b' : '#74888e',
          },
          components: {
            Menu: {
              colorItemBgSelected:
                mode === 'light' ? '#f0f0f0' : 'rgba(255, 255, 255, 0.1)',
            },
          },
        }}
      >
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
