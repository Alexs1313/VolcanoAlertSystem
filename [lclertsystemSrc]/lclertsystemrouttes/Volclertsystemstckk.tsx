import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Volclertsystlodr from '../lclertsystemcmpnts/Volclertsystlodr';
import Volclertsystonbrdn from '../[lclertsystemscrnns]/Volclertsystonbrdn';
import Volclertsysthom from '../[lclertsystemscrnns]/Volclertsysthom';
import Volclertsystlist from '../[lclertsystemscrnns]/Volclertsystlist';
import Volclertsystdet from '../[lclertsystemscrnns]/Volclertsystdet';
import Volclertsysettngs from '../[lclertsystemscrnns]/Volclertsysettngs';
import Volclertsymap from '../[lclertsystemscrnns]/Volclertsymap';
import Volclertsysttries from '../[lclertsystemscrnns]/Volclertsysttries';
import Volclertsysttrdet from '../[lclertsystemscrnns]/Volclertsysttrdet';
import Volclertsysttrqizz from '../[lclertsystemscrnns]/Volclertsysttrqizz';
import Volclertsysttractvty from '../[lclertsystemscrnns]/Volclertsysttractvty';
import Volclertsysavedplaces from '../[lclertsystemscrnns]/Volclertsysavedplaces';

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
      <NativeStack.Screen
        name="Volclertsystlist"
        component={Volclertsystlist}
      />
      <NativeStack.Screen name="Volclertsystdet" component={Volclertsystdet} />
      <NativeStack.Screen
        name="Volclertsysettngs"
        component={Volclertsysettngs}
      />
      <NativeStack.Screen name="Volclertsymap" component={Volclertsymap} />
      <NativeStack.Screen
        name="Volclertsysttries"
        component={Volclertsysttries}
      />
      <NativeStack.Screen
        name="Volclertsysttrdet"
        component={Volclertsysttrdet}
      />
      <NativeStack.Screen
        name="Volclertsysttrqizz"
        component={Volclertsysttrqizz}
      />
      <NativeStack.Screen
        name="Volclertsysttractvty"
        component={Volclertsysttractvty}
      />
      <NativeStack.Screen
        name="Volclertsysavedplaces"
        component={Volclertsysavedplaces}
      />
    </NativeStack.Navigator>
  );
};

export default Volclertsystemstckk;
