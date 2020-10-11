import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

import { View, Spacer } from '../components/Themed';
import { PersonTabParamList } from '../types';

import RoundedContainer from '../components/RoundedContainer';

import AppbarHeader from '../components/AppbarHeader';
import GradientButton from '../components/GradientButton';
import { useNavigation } from '@react-navigation/native';
import Globals from '../utils/Globals';
import { addPerson } from '../services/Api';

export default function AddScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [aliases, setAliases] = useState('');

  const onPressAdd = () => {
    const { token } = Globals;
    if (firstName.length && lastName.length) {
      addPerson(firstName, lastName, aliases, token).then(person => {
        Alert.alert(
          'Person Added',
          `${person?.first_name} ${person?.last_name} added`
        );
      });
    } else {
      Alert.alert('Error', "First and Last names can't be empty");
    }
  };

  return (
    <View style={styles.container}>
      <AppbarHeader title={'Add Person'} goBack={navigation.goBack} />
      <RoundedContainer style={{ overflow: 'visible' }}>
        <TextInput
          mode="outlined"
          label="First Name"
          onChangeText={setFirstName}
          value={firstName}
        />
        <Spacer />
        <TextInput
          mode="outlined"
          label="Last Name"
          onChangeText={setLastName}
          value={lastName}
        />
        <Spacer />
        <TextInput
          onChangeText={setAliases}
          value={aliases}
          mode="outlined"
          label="Aliases (separeted by ',')"
          multiline
        />
        <Spacer />
        <GradientButton
          icon="send"
          label="Enviar"
          onPress={onPressAdd}
          colors={['#05E560', '#04AF49']}
          labelColor={'#FFF'}
        />
      </RoundedContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
