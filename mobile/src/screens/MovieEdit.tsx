import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import _ from 'lodash';

import { Spacer } from '../components/Spacer';

import RoundedContainer from '../components/RoundedContainer';

import AppbarHeader from '../components/AppbarHeader';
import GradientButton from '../components/GradientButton';
import { editMovie, getMovie, MovieData, PersonData } from '../services/Api';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { PersonForm } from '../components/PersonForm';
import { MovieTabParamList } from '../types';
import PageContainer from '../components/PageContainer';

type ScreenProps = {
  route: RouteProp<MovieTabParamList, 'MovieEdit'>;
};
export default function MovieEditScreen({ route }: ScreenProps) {
  const navigation = useNavigation();

  const [movieId, setMovieId] = useState(-1);
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  const [casting, setCasting] = useState<PersonData[]>([]);
  const [producers, setProducers] = useState<PersonData[]>([]);
  const [directors, setdirectors] = useState<PersonData[]>([]);

  useEffect(() => {
    getMovie(route.params.movie.id).then(movie => {
      if (movie) {
        setMovieId(movie.id);
        setTitle(movie.title);
        setReleaseYear(movie.release_year.toString());
        if (movie.casting) {
          setCasting(movie.casting);
        }
        if (movie.producers) {
          setProducers(movie.producers);
        }
        if (movie.directors) {
          setdirectors(movie.directors);
        }
      }
    });
  }, []);

  const onPressSave = () => {
    const token = '';
    if (title.length && releaseYear.length) {
      editMovie(movieId, title, parseFloat(releaseYear), token, casting, producers, directors).then(movie => {
        Alert.alert('Movie Saved', `${movie?.title} saved`);
        navigation.goBack();
      });
    } else {
      Alert.alert('Error', "Title and Release Year can't be empty");
    }
  };

  return (
    <PageContainer>
      <AppbarHeader title={'Edit Movie'} goBack={navigation.goBack} />
      <RoundedContainer style={{ overflow: 'visible' }}>
        <ScrollView>
          <TextInput mode="outlined" label="Title" onChangeText={setTitle} value={title} />
          <Spacer />
          <TextInput
            mode="outlined"
            label="Release Year"
            keyboardType="numeric"
            onChangeText={setReleaseYear}
            value={releaseYear}
          />
          <Spacer />

          <PersonForm label="Casting" setSelectedPeople={setCasting} selectedPeople={casting} type="casting" />
          <Spacer />

          <PersonForm label="Producers" setSelectedPeople={setProducers} selectedPeople={producers} type="producer" />
          <Spacer />

          <PersonForm label="Directors" setSelectedPeople={setdirectors} selectedPeople={directors} type="director" />
          <Spacer />

          <GradientButton
            icon="send"
            label="Update"
            onPress={onPressSave}
            colors={['#05E560', '#04AF49']}
            labelColor={'#FFF'}
          />
        </ScrollView>
        <Spacer />
      </RoundedContainer>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
