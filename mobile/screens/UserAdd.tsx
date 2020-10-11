import React, { useState } from 'react';

import { StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

import { View, TextInput } from '../components/Themed';
import { rspHeight } from '../utils/Responsive';
import Logo from '../components/Logo';
import { addUser } from '../services/Api';
import LocalStorage from '../services/LocalStorage';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

export default function UserAddScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressAddButton = async () => {
    addUser({
      email,
      password
    }).then(user => {
      if (user) {
        LocalStorage.set('email', email);
        LocalStorage.set('password', password);
        navigation.navigate('Login');
      }
    });
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
          onPress={onPressAddButton}
        >
          Sing Up
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
