import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';

import { Spacer } from '../components/Spacer';

import RoundedContainer from '../components/RoundedContainer';

import AppbarHeader from '../components/AppbarHeader';
import GradientButton from '../components/GradientButton';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { editPerson, getPerson, MovieData } from '../services/Api';
import { MovieForm } from '../components/MovieForm';
import { PersonTabParamList } from '../types';
import PageContainer from '../components/PageContainer';

type ScreenProps = {
  route: RouteProp<PersonTabParamList, 'PersonEdit'>;
};
export default function PersonEditScreen({ route }: ScreenProps) {
  const navigation = useNavigation();
  const [personId, setPersonId] = useState(-1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [aliases, setAliases] = useState('');

  const [moviesAsActor, setMoviesAsActor] = useState<MovieData[]>([]);
  const [moviesAsProducer, setMoviesAsProducer] = useState<MovieData[]>([]);
  const [moviesAsDirector, setMoviesAsDirector] = useState<MovieData[]>([]);

  useEffect(() => {
    getPerson(route.params.person.id).then(person => {
      if (person) {
        setPersonId(person.id);
        setFirstName(person.first_name);
        setLastName(person.last_name);
        setAliases(person.aliases.join(', '));

        if (person.moviesAsActor) setMoviesAsActor(person.moviesAsActor);
        if (person.moviesAsProducer) setMoviesAsProducer(person.moviesAsProducer);
        if (person.moviesAsDirector) setMoviesAsDirector(person.moviesAsDirector);
      }
    });
  }, []);

  const onPressSave = () => {
    const token = '';
    if (firstName.length && lastName.length) {
      editPerson(
        personId,
        firstName,
        lastName,
        aliases,
        token,

        moviesAsActor,
        moviesAsProducer,
        moviesAsDirector
      ).then(person => {
        Alert.alert('Edit Saved', `${person?.first_name} ${person?.last_name} saved`);
        navigation.goBack();
      });
    } else {
      Alert.alert('Error', "First and Last names can't be empty");
    }
  };

  return (
    <PageContainer>
      <AppbarHeader title={'Edit Person'} goBack={navigation.goBack} />
      <RoundedContainer style={{ overflow: 'visible' }}>
        <ScrollView>
          <TextInput mode="outlined" label="First Name" onChangeText={setFirstName} value={firstName} />
          <Spacer />
          <TextInput mode="outlined" label="Last Name" onChangeText={setLastName} value={lastName} />
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
            type="casting"
          />
          <Spacer />

          <MovieForm
            label="Movies as Producer"
            setSelectedMovies={setMoviesAsProducer}
            selectedMovies={moviesAsProducer}
            type="producer"
          />
          <Spacer />

          <MovieForm
            label="Movies as Director"
            setSelectedMovies={setMoviesAsDirector}
            selectedMovies={moviesAsDirector}
            type="director"
          />
          <Spacer />

          <GradientButton
            icon="send"
            label="Enviar"
            onPress={onPressSave}
            colors={['#05E560', '#04AF49']}
            labelColor={'#FFF'}
          />
        </ScrollView>
      </RoundedContainer>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
