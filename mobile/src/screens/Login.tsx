import React, { useState, useEffect } from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

import { TextInput } from '../components/TextInput';
import { rspHeight } from '../utils/Responsive';

import { getToken } from '../services/Api';
import LocalStorage from '../services/LocalStorage';
import { useNavigation } from '@react-navigation/native';
import PageContainer from '../components/PageContainer';

const { width, height } = Dimensions.get('screen');
export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchUserInfo = async () => {
    const user = await LocalStorage.get('email');
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
      navigation.navigate('Internal');
    }
  };

  const onPressBackButton = async () => {
    navigation.goBack();
  };

  return (
    <PageContainer>
      <View style={styles.form}>
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
        <Button mode="contained" labelStyle={styles.loginButtonLabel} onPress={onPressLoginButton}>
          Login
        </Button>
        <View style={styles.spacer} />
        <Button mode="contained" labelStyle={styles.loginButtonLabel} onPress={onPressBackButton}>
          Back
        </Button>
      </View>
    </PageContainer>
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
