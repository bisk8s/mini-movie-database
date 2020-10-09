import React from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { rspWidth } from '../utils/Responsive';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

export default function InternalMenu({
  navigation
}: {
  navigation: StackNavigationProp<RootStackParamList>;
}) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const navigateToLogin = () => {
    setVisible(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="menu"
              color={'#FFF'}
              size={rspWidth(68)}
              onPress={openMenu}
            />
          }
        >
          <Menu.Item onPress={navigateToLogin} title="Login" />
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end'
  },
  border: {
    width: rspWidth(188),
    height: rspWidth(188),

    borderColor: '#027391',
    backgroundColor: '#fff',

    borderRadius: rspWidth(188),
    borderWidth: rspWidth(6)
  },
  title: { color: '#027391' },

  header: {
    marginTop: Constants.statusBarHeight,
    alignItems: 'flex-end'
  }
});
