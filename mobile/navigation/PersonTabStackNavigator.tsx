import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack';

import PersonHomeScreen from '../screens/PersonHome';
import PersonDetailScreen from '../screens/PersonDetail';

import { BottomTabParamList, PersonTabParamList } from '../types';

import PersonAddScreen from '../screens/PersonAdd';
import { RouteProp, useNavigation } from '@react-navigation/native';

import _ from 'lodash';

const StackNavigator = createStackNavigator<PersonTabParamList>();

type Props = {
  route: RouteProp<BottomTabParamList, 'PersonTab'>;
  navigation: StackNavigationProp<BottomTabParamList>;
};
export function PersonTabStackNavigator({ navigation, route }: Props) {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="PersonHome" component={PersonHomeScreen} />
      <StackNavigator.Screen
        name="PersonDetail"
        component={PersonDetailScreen}
      />
      <StackNavigator.Screen name="PersonAdd" component={PersonAddScreen} />
    </StackNavigator.Navigator>
  );
}
