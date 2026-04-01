// STACK NAV

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Exploresystmsystlodr from '../Explorresyystmcmpns/Exploresystmsystlodr';

import Exploresystmsystonbrdn from '../Explorresyystmscrnn/Exploresystmsystonbrdn';

import Exploresystmsysthom from '../Explorresyystmscrnn/Exploresystmsysthom';

import Exploresystmsystlist from '../Explorresyystmscrnn/Exploresystmsystlist';
import Exploresystmsystdet from '../Explorresyystmscrnn/Exploresystmsystdet';
import Exploresystmsysettngs from '../Explorresyystmscrnn/Exploresystmsysettngs';
import Exploresystmsymap from '../Explorresyystmscrnn/Exploresystmsymap';
import Exploresystmsysttries from '../Explorresyystmscrnn/Exploresystmsysttries';
import Exploresystmsysttrdet from '../Explorresyystmscrnn/Exploresystmsysttrdet';
import Exploresystmsysttrqizz from '../Explorresyystmscrnn/Exploresystmsysttrqizz';
import Exploresystmsysttractvty from '../Explorresyystmscrnn/Exploresystmsysttractvty';
import Exploresystmsysavedplaces from '../Explorresyystmscrnn/Exploresystmsysavedplaces';

const Stack = createStackNavigator();

const Exploresystmsystemstckk: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Exploresystmsystlodr"
        component={Exploresystmsystlodr}
      />
      <Stack.Screen
        name="Exploresystmsystonbrdn"
        component={Exploresystmsystonbrdn}
      />
      <Stack.Screen
        name="Exploresystmsysthom"
        component={Exploresystmsysthom}
      />
      <Stack.Screen
        name="Exploresystmsystlist"
        component={Exploresystmsystlist}
      />
      <Stack.Screen
        name="Exploresystmsystdet"
        component={Exploresystmsystdet}
      />
      <Stack.Screen
        name="Exploresystmsysettngs"
        component={Exploresystmsysettngs}
      />
      <Stack.Screen name="Exploresystmsymap" component={Exploresystmsymap} />
      <Stack.Screen
        name="Exploresystmsysttries"
        component={Exploresystmsysttries}
      />
      <Stack.Screen
        name="Exploresystmsysttrdet"
        component={Exploresystmsysttrdet}
      />
      <Stack.Screen
        name="Exploresystmsysttrqizz"
        component={Exploresystmsysttrqizz}
      />
      <Stack.Screen
        name="Exploresystmsysttractvty"
        component={Exploresystmsysttractvty}
      />
      <Stack.Screen
        name="Exploresystmsysavedplaces"
        component={Exploresystmsysavedplaces}
      />
    </Stack.Navigator>
  );
};

export default Exploresystmsystemstckk;
