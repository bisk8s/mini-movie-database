import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MovieHomeScreen from '../screens/MovieHome';
import MovieDetailScreen from '../screens/MovieDetail';
import MovieAddScreen from '../screens/MovieAdd';
import MovieEditScreen from '../screens/MovieEdit';

import { MovieTabParamList } from '../types';

const StackNavigator = createStackNavigator<MovieTabParamList>();
export function MovieTabStackNavigator() {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="MovieHome" component={MovieHomeScreen} />
      <StackNavigator.Screen name="MovieDetail" component={MovieDetailScreen} />
      <StackNavigator.Screen name="MovieAdd" component={MovieAddScreen} />
      <StackNavigator.Screen name="MovieEdit" component={MovieEditScreen} />
    </StackNavigator.Navigator>
  );
}
