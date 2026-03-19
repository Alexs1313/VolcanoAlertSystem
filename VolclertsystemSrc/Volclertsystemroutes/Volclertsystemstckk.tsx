import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Volclertsystlodr from '../Volclertsystemcmpnt/Volclertsystlodr';
import Volclertsystonbrdn from '../Volclertsystemscrns/Volclertsystonbrdn';
import Volclertsysthom from '../Volclertsystemscrns/Volclertsysthom';
import Volclertsystlist from '../Volclertsystemscrns/Volclertsystlist';
import Volclertsystdet from '../Volclertsystemscrns/Volclertsystdet';
import Volclertsysettngs from '../Volclertsystemscrns/Volclertsysettngs';
import Volclertsymap from '../Volclertsystemscrns/Volclertsymap';
import Volclertsysttries from '../Volclertsystemscrns/Volclertsysttries';
import Volclertsysttrdet from '../Volclertsystemscrns/Volclertsysttrdet';
import Volclertsysttrqizz from '../Volclertsystemscrns/Volclertsysttrqizz';
import Volclertsysttractvty from '../Volclertsystemscrns/Volclertsysttractvty';

const NativeStack = createStackNavigator();

const Volclertsystemstckk: React.FC = () => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen
        name="Volclertsystlodr"
        component={Volclertsystlodr}
      />
      <NativeStack.Screen
        name="Volclertsystonbrdn"
        component={Volclertsystonbrdn}
      />
      <NativeStack.Screen name="Volclertsysthom" component={Volclertsysthom} />
      <NativeStack.Screen name="Volclertsystlist" component={Volclertsystlist} />
      <NativeStack.Screen name="Volclertsystdet" component={Volclertsystdet} />
      <NativeStack.Screen name="Volclertsysettngs" component={Volclertsysettngs} />
      <NativeStack.Screen name="Volclertsymap" component={Volclertsymap} />
      <NativeStack.Screen name="Volclertsysttries" component={Volclertsysttries} />
      <NativeStack.Screen name="Volclertsysttrdet" component={Volclertsysttrdet} />
      <NativeStack.Screen name="Volclertsysttrqizz" component={Volclertsysttrqizz} />
      <NativeStack.Screen
        name="Volclertsysttractvty"
        component={Volclertsysttractvty}
      />
    </NativeStack.Navigator>
  );
};

export default Volclertsystemstckk;
