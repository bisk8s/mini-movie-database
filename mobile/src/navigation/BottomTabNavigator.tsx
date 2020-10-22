import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { get } from 'lodash';

import { createMaterialTopTabNavigator, MaterialTopTabBarOptions } from '@react-navigation/material-top-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { BottomTabParamList, RootStackParamList } from '../types';

import InternalTopMenu from '../components/InternalTopMenu';

import { PersonTabStackNavigator } from './PersonTabStackNavigator';
import { MovieTabStackNavigator } from './MovieTabStackNavigator';
import { Badge, Text } from 'react-native-paper';
import { rspWidth, rspHeight } from '../utils/Responsive';

import Colors from '../constants/Colors';

const Tab = createMaterialTopTabNavigator<BottomTabParamList>();

type TabBarItemProps = {
  ikey: string;
  label: string;
  icon: string;
  isFocused: boolean;
  badge?: string;
  onPress: () => void;
};
function TabBarItem({ ikey, label, icon, badge, isFocused, onPress }: TabBarItemProps) {
  const key = ikey;

  return (
    <TouchableOpacity
      key={key}
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: rspHeight(24),
        marginBottom: rspHeight(48),
        borderRadius: rspWidth(48),

        marginHorizontal: rspWidth(10),

        backgroundColor: isFocused ? Colors.tabActiveBackgroundColor : Colors.tabInactiveBackgroundColor
      }}
    >
      <View
        style={{
          position: 'relative'
        }}
      >
        <Badge
          style={{
            position: 'absolute',
            top: rspWidth(-25),
            left: rspWidth(50)
          }}
          visible={!!badge}
          size={rspWidth(50)}
        >
          {badge}
        </Badge>
      </View>
      <Ionicons name={icon} size={rspWidth(50)} color={Colors.tint} />
      <Text
        style={{
          color: Colors.tint,
          fontFamily: 'nunito-regular',
          fontSize: rspHeight(25)
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function BottomTabNavigator({ navigation }: StackScreenProps<RootStackParamList>) {
  const tabBarOptions: MaterialTopTabBarOptions = {
    renderIndicator: () => null,
    renderTabBarItem: props => {
      const stateIndex = props.navigationState.index;
      const index = props.navigationState.routes.lastIndexOf(props.route);
      const isFocused = stateIndex === index;

      const name = get(props, ['route', 'name']);

      switch (name) {
        default:
        case 'MovieTab':
          return <TabBarItem ikey={props.key} label="Movies" isFocused={isFocused} icon="ios-film" {...props} />;
        case 'PersonTab':
          return <TabBarItem ikey={props.key} label="People" isFocused={isFocused} icon="ios-people" {...props} />;
      }
    },
    style: {
      marginTop: -1,
      backgroundColor: '#F7F7F7',

      borderTopWidth: 3,
      borderTopColor: '#F7F7F7'
    }
  };

  return (
    <View style={styles.wrapper}>
      <InternalTopMenu navigation={navigation} />
      <Tab.Navigator swipeEnabled tabBarPosition="bottom" initialRouteName="MovieTab" tabBarOptions={tabBarOptions}>
        <Tab.Screen name="MovieTab" component={MovieTabStackNavigator} />
        <Tab.Screen name="PersonTab" component={PersonTabStackNavigator} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});
