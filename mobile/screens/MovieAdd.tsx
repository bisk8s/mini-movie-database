import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

import { View, Spacer } from '../components/Themed';
import { MovieTabParamList } from '../types';

import RoundedContainer from '../components/RoundedContainer';

import AppbarHeader from '../components/AppbarHeader';
import GradientButton from '../components/GradientButton';
import { addMovie } from '../services/Api';
import Globals from '../utils/Globals';
import { useNavigation } from '@react-navigation/native';

export default function MovieAdddScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  const onPressAdd = () => {
    const { token } = Globals;
    if (title.length && releaseYear.length) {
      addMovie(title, parseFloat(releaseYear), token).then(movie => {
        Alert.alert('Movie Added', `${movie?.title} added`);
      });
    } else {
      Alert.alert('Error', "Title and Release Year can't be empty");
    }
  };

  return (
    <View style={styles.container}>
      <AppbarHeader title={'Add Movie'} goBack={navigation.goBack} />
      <RoundedContainer style={{ overflow: 'visible' }}>
        <TextInput mode="outlined" label="Title" onChangeText={setTitle} />
        <Spacer />
        <TextInput
          mode="outlined"
          label="Release Year"
          keyboardType="numeric"
          onChangeText={setReleaseYear}
        />
        <Spacer />
        <GradientButton
          icon="send"
          label="Add"
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
