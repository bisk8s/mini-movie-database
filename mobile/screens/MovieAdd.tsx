import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

import { View, Spacer } from '../components/Themed';
import { MovieTabParamList } from '../types';

import RoundedContainer from '../components/RoundedContainer';

import AppbarHeader from '../components/AppbarHeader';
import GradientButton from '../components/GradientButton';

type ScreenProps = {
  navigation: StackNavigationProp<MovieTabParamList>;
};
export default function MovieAdddScreen({ navigation }: ScreenProps) {
  return (
    <View style={styles.container}>
      <AppbarHeader title={'Add'} />
      <RoundedContainer style={{ overflow: 'visible' }}>
        <TextInput mode="outlined" label="Renda" />
        <Spacer />
        <TextInput mode="outlined" label="Observação" multiline />
        <Spacer />
        <GradientButton
          icon="send"
          label="Enviar"
          onPress={() => navigation.navigate('MovieAdd')}
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
