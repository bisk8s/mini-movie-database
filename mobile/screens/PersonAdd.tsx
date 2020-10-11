import React, { useState } from 'react';
import { Alert, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';

import { View, Spacer } from '../components/Themed';

import RoundedContainer from '../components/RoundedContainer';

import AppbarHeader from '../components/AppbarHeader';
import GradientButton from '../components/GradientButton';
import { useNavigation } from '@react-navigation/native';
import Globals from '../utils/Globals';
import { addPerson, MovieData } from '../services/Api';
import { MovieForm } from '../components/MovieForm';

export default function AddScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [aliases, setAliases] = useState('');

  const [moviesAsActor, setMoviesAsActor] = useState<MovieData[]>([]);
  const [moviesAsProducer, setMoviesAsProducer] = useState<MovieData[]>([]);
  const [moviesAsDirector, setMoviesAsDirector] = useState<MovieData[]>([]);

  const onPressAdd = () => {
    const { token } = Globals;
    if (firstName.length && lastName.length) {
      addPerson(
        firstName,
        lastName,
        aliases,
        token,

        moviesAsActor,
        moviesAsProducer,
        moviesAsDirector
      ).then(person => {
        Alert.alert(
          'Person Added',
          `${person?.first_name} ${person?.last_name} added`
        );
        navigation.goBack();
      });
    } else {
      Alert.alert('Error', "First and Last names can't be empty");
    }
  };

  return (
    <View style={styles.container}>
      <AppbarHeader title={'Add Person'} goBack={navigation.goBack} />
      <RoundedContainer style={{ overflow: 'visible' }}>
        <ScrollView>
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

          <MovieForm
            label="Movies as Actor"
            setSelectedMovies={setMoviesAsActor}
            selectedMovies={moviesAsActor}
          />
          <Spacer />

          <MovieForm
            label="Movies as Producer"
            setSelectedMovies={setMoviesAsProducer}
            selectedMovies={moviesAsProducer}
          />
          <Spacer />

          <MovieForm
            label="Movies as Director"
            setSelectedMovies={setMoviesAsDirector}
            selectedMovies={moviesAsDirector}
          />
          <Spacer />

          <GradientButton
            icon="send"
            label="Enviar"
            onPress={onPressAdd}
            colors={['#05E560', '#04AF49']}
            labelColor={'#FFF'}
          />
        </ScrollView>
      </RoundedContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
