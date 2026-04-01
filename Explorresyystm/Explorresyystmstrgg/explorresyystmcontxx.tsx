// CONTEXT

import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { createContext, useContext, useEffect, useState } from 'react';

export const StoreContext = createContext<{
  exploresystmBackgroundMusic: boolean;
  setVolcLertBackgroundMusic: (value: boolean) => void;
  exploresystmVibration: boolean;
  setVolcLertVibration: (value: boolean) => void;
  exploresystmDarkMapTheme: boolean;
  setVolcLertDarkMapTheme: (value: boolean) => void;
}>({
  exploresystmBackgroundMusic: false,
  setVolcLertBackgroundMusic: () => {},
  exploresystmVibration: false,
  setVolcLertVibration: () => {},
  exploresystmDarkMapTheme: true,
  setVolcLertDarkMapTheme: () => {},
});

export const useStore = () => {
  return useContext(StoreContext);
};

export const VolcSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [exploresystmBackgroundMusic, setVolcLertBackgroundMusic] =
    useState(false);
  const [exploresystmVibration, setVolcLertVibration] = useState(false);
  const [exploresystmDarkMapTheme, setVolcLertDarkMapTheme] = useState(true);

  useEffect(() => {
    const exploresystmLoadSettings = async () => {
      try {
        const [
          exploresystmBackgroundMusicRaw,
          exploresystmVibrationRaw,
          exploresystmDarkMapThemeRaw,
        ] = await Promise.all([
          AsyncStorage.getItem('toggleVolcLertBackgroundMusic'),
          AsyncStorage.getItem('toggleVolcLertVibration'),
          AsyncStorage.getItem('toggleVolcLertDarkMapTheme'),
        ]);

        if (exploresystmBackgroundMusicRaw !== null) {
          setVolcLertBackgroundMusic(
            JSON.parse(exploresystmBackgroundMusicRaw),
          );
        }
        if (exploresystmVibrationRaw !== null) {
          setVolcLertVibration(JSON.parse(exploresystmVibrationRaw));
        }
        if (exploresystmDarkMapThemeRaw !== null) {
          setVolcLertDarkMapTheme(JSON.parse(exploresystmDarkMapThemeRaw));
        }
      } catch {
        // Keep default settings on read error.
      }
    };

    exploresystmLoadSettings();
  }, []);

  const contextValues = {
    exploresystmBackgroundMusic,
    setVolcLertBackgroundMusic,
    exploresystmVibration,
    setVolcLertVibration,
    exploresystmDarkMapTheme,
    setVolcLertDarkMapTheme,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};
