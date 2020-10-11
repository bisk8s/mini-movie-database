import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PersonHomeScreen from '../screens/PersonHome';
import PersonDetailScreen from '../screens/PersonDetail';

import { PersonTabParamList } from '../types';

import PersonAddScreen from '../screens/PersonAdd';

import _ from 'lodash';
import PersonEditScreen from '../screens/PersonEdit';

const StackNavigator = createStackNavigator<PersonTabParamList>();

export function PersonTabStackNavigator() {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="PersonHome" component={PersonHomeScreen} />
      <StackNavigator.Screen
        name="PersonDetail"
        component={PersonDetailScreen}
      />
      <StackNavigator.Screen name="PersonAdd" component={PersonAddScreen} />
      <StackNavigator.Screen name="PersonEdit" component={PersonEditScreen} />
    </StackNavigator.Navigator>
  );
}
