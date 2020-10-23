import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { RootStackParamList } from '../types';

import LoginScreen from '../screens/Login';
import BottomTabNavigator from './BottomTabNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';
import UserAddScreen from '../screens/UserAdd';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Internal" component={BottomTabNavigator} />
      <Stack.Screen name="UserAdd" component={UserAddScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
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
