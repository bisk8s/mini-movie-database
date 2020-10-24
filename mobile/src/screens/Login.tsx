import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

import { rspHeight } from '../utils/Responsive';

import { getToken } from '../services/Api';

import { State } from '../redux/reducers';
import { TextInput, Spacer, PageContainer, AppbarHeader } from '../components';

function LoginScreen(state: State) {
  const navigation = useNavigation();
  const { email, password } = state.session;

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
      <UserForm>
        <AppbarHeader title="Login" />
        <Spacer />
        <TextInput
          placeholder="Email"
          value={email}
          // onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Spacer />
        <TextInput
          placeholder="Password"
          value={password}
          // onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />
        <Spacer />
        <Button mode="contained" onPress={onPressLoginButton}>
          Enter
        </Button>
        <Spacer />
        <Button mode="contained" onPress={onPressBackButton}>
          Back
        </Button>
      </UserForm>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: rspHeight(40)
  },
  loginButtonLabel: {
    lineHeight: rspHeight(130),
    color: '#FFF',
    textTransform: 'none',
    fontFamily: 'nunito-light',
    fontSize: rspHeight(38)
  }
});
const UserForm = styled(View)`
  ${styles.form}
`;

export const Login = connect((state: State) => state)(LoginScreen);
