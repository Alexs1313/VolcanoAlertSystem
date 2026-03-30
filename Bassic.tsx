import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { VolcSettingsProvider } from './[lclertsystemSrc]/[lclertsystemstorggee]/volclertsystcntx';
import Volclertsystemstckk from './[lclertsystemSrc]/lclertsystemrouttes/Volclertsystemstckk';

const Bassic: React.FC = () => {
  return (
    <NavigationContainer>
      <VolcSettingsProvider>
        <Volclertsystemstckk />
      </VolcSettingsProvider>
    </NavigationContainer>
  );
};

export default Bassic;
