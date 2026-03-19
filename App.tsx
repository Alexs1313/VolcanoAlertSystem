import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { VolcSettingsProvider } from './VolclertsystemSrc/Volclertsystemstorg/volclertsystcntx';
import Volclertsystemstckk from './VolclertsystemSrc/Volclertsystemroutes/Volclertsystemstckk';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <VolcSettingsProvider>
        <Volclertsystemstckk />
      </VolcSettingsProvider>
    </NavigationContainer>
  );
};

export default App;
