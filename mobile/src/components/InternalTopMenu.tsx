import React, { useState, useEffect } from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { StackNavigationProp } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import { rspWidth } from '../utils/Responsive';
import { RootStackParamList } from '../types';

export function InternalTopMenu({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) {
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

  const navigateToUserAdd = () => {
    setVisible(false);
    navigation.navigate('UserAdd');
  };

  const logoff = () => {
    // Globals.token = '';
    setVisible(false);
    setAuthAreaHidden(true);
    navigation.navigate('Login');
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    const token = '';
    setAuthAreaHidden(!token);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton icon="menu" color={Colors.text} size={rspWidth(68)} onPress={openMenu} />}
        >
          {authAreaHidden && (
            <>
              <Menu.Item onPress={navigateToLogin} title="Login" />
              <Menu.Item onPress={navigateToUserAdd} title="New User" />
            </>
          )}
          {!authAreaHidden && <Menu.Item onPress={logoff} title="Logout" />}
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-end',
    backgroundColor: Colors.background
  },
  border: {
    width: rspWidth(188),
    height: rspWidth(188),

    borderColor: Colors.tint,
    backgroundColor: Colors.background,

    borderRadius: rspWidth(188),
    borderWidth: rspWidth(6)
  },
  title: { color: Colors.tint },

  header: {
    marginTop: Constants.statusBarHeight,
    alignItems: 'flex-end'
  }
});
