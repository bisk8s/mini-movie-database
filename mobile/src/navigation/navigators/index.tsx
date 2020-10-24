import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from '../../types';

import { Login } from '../../screens';
import NotFoundScreen from '../../screens/NotFoundScreen';
import UserAddScreen from '../../screens/UserAdd';

import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Internal" component={BottomTabNavigator} />
      <Stack.Screen name="UserAdd" component={UserAddScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{
          headerShown: true,
          title: 'Oops!'
        }}
      />
    </Stack.Navigator>
  );
}
