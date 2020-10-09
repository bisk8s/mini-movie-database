import React, { useState, useEffect } from 'react';

import { StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

import { View, TextInput } from '../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { rspHeight } from '../utils/Responsive';
import Logo from '../components/Logo';

import { getToken } from '../services/Api';
import { isEmpty } from 'lodash';
import LocalStorage from '../services/LocalStorage';

const { width, height } = Dimensions.get('screen');

export default function LoginScreen({
  navigation
}: StackScreenProps<RootStackParamList>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchUserInfo = async () => {
    const user = await LocalStorage.get('username');
    const pass = await LocalStorage.get('password');
    setEmail(user);
    setPassword(pass);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const onPressLoginButton = async () => {
    const token = await getToken(email, password);
    if (token) {
      LocalStorage.set('token', token);
      navigation.navigate('Internal');
    }
  };

  const onPressBackButton = async () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Logo />
        <View style={styles.spacerLarger} />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <View style={styles.spacer} />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />
        <View style={styles.spacer2x} />
        <Button
          mode="contained"
          labelStyle={styles.loginButtonLabel}
          onPress={onPressLoginButton}
        >
          Login
        </Button>
        <View style={styles.spacer} />
        <Button
          mode="outlined"
          labelStyle={styles.loginButtonLabel}
          onPress={onPressBackButton}
        >
          Back
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center'
  },
  form: {
    paddingHorizontal: rspHeight(40)
  },
  spacer: {
    height: rspHeight(60)
  },
  spacer2x: {
    height: rspHeight(80)
  },
  spacerLarger: {
    height: rspHeight(150)
  },
  loginButtonLabel: {
    lineHeight: rspHeight(130),
    color: '#FFF',
    textTransform: 'none',
    fontFamily: 'nunito-light',
    fontSize: rspHeight(38)
  },
  textInput: {
    color: '#FFF'
  }
});
