import React, { createContext, useContext, useState } from 'react';

export const StoreContext = createContext<{
  volcLertBackgroundMusic: boolean;
  setVolcLertBackgroundMusic: (value: boolean) => void;
  volcLertVibration: boolean;
  setVolcLertVibration: (value: boolean) => void;
}>({
  volcLertBackgroundMusic: false,
  setVolcLertBackgroundMusic: () => {},
  volcLertVibration: false,
  setVolcLertVibration: () => {},
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

  const contextValues = {
    volcLertBackgroundMusic,
    setVolcLertBackgroundMusic,
    volcLertVibration,
    setVolcLertVibration,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};
