import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreContext = createContext<{
  volcLertBackgroundMusic: boolean;
  setVolcLertBackgroundMusic: (value: boolean) => void;
  volcLertVibration: boolean;
  setVolcLertVibration: (value: boolean) => void;
  volcLertDarkMapTheme: boolean;
  setVolcLertDarkMapTheme: (value: boolean) => void;
}>({
  volcLertBackgroundMusic: false,
  setVolcLertBackgroundMusic: () => {},
  volcLertVibration: false,
  setVolcLertVibration: () => {},
  volcLertDarkMapTheme: true,
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
  const [volcLertBackgroundMusic, setVolcLertBackgroundMusic] = useState(false);
  const [volcLertVibration, setVolcLertVibration] = useState(false);
  const [volcLertDarkMapTheme, setVolcLertDarkMapTheme] = useState(true);

  useEffect(() => {
    const volcLertLoadSettings = async () => {
      try {
        const [
          volcLertBackgroundMusicRaw,
          volcLertVibrationRaw,
          volcLertDarkMapThemeRaw,
        ] = await Promise.all([
          AsyncStorage.getItem('toggleVolcLertBackgroundMusic'),
          AsyncStorage.getItem('toggleVolcLertVibration'),
          AsyncStorage.getItem('toggleVolcLertDarkMapTheme'),
        ]);

        if (volcLertBackgroundMusicRaw !== null) {
          setVolcLertBackgroundMusic(JSON.parse(volcLertBackgroundMusicRaw));
        }
        if (volcLertVibrationRaw !== null) {
          setVolcLertVibration(JSON.parse(volcLertVibrationRaw));
        }
        if (volcLertDarkMapThemeRaw !== null) {
          setVolcLertDarkMapTheme(JSON.parse(volcLertDarkMapThemeRaw));
        }
      } catch {
        // Keep default settings on read error.
      }
    };

    volcLertLoadSettings();
  }, []);

  const contextValues = {
    volcLertBackgroundMusic,
    setVolcLertBackgroundMusic,
    volcLertVibration,
    setVolcLertVibration,
    volcLertDarkMapTheme,
    setVolcLertDarkMapTheme,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};
