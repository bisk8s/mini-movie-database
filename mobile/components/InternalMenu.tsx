import React, { useState, useEffect } from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { rspWidth } from '../utils/Responsive';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import Globals from '../utils/Globals';

export default function InternalMenu({
  navigation
}: {
  navigation: StackNavigationProp<RootStackParamList>;
}) {
  const [visible, setVisible] = useState(false);
  const [authAreaHidden, setAuthAreaHidden] = useState(true);

  const openMenu = () => {
    fetchToken().then(() => {
      setVisible(true);
    });
  };

  const closeMenu = () => {
    fetchToken().then(() => {
      setVisible(false);
    });
  };

  const navigateToLogin = () => {
    setVisible(false);
    navigation.navigate('Login');
  };

  const navigateToLogoff = () => {
    setVisible(false);
    setAuthAreaHidden(false);
    Globals.token = '';
    navigation.navigate('Login');
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    const { token } = Globals;
    setAuthAreaHidden(!(token && token.length > 0));
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
          {authAreaHidden && (
            <Menu.Item onPress={navigateToLogin} title="Login" />
          )}
          {!authAreaHidden && (
            <Menu.Item onPress={navigateToLogoff} title="Logout" />
          )}
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
