import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';

import { addMovie, PersonData } from '../services/Api';

import { Spacer, RoundedContainer, AppbarHeader, GradientButton, PersonForm, PageContainer } from '../components';

export default function MovieAddScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  const [casting, setCasting] = useState<PersonData[]>([]);
  const [producers, setProducers] = useState<PersonData[]>([]);
  const [directors, setdirectors] = useState<PersonData[]>([]);

  const onPressAdd = () => {
    const token = '';
    if (title.length && releaseYear.length) {
      addMovie(title, parseFloat(releaseYear), token, casting, producers, directors).then(movie => {
        Alert.alert('Movie Added', `${movie?.title} added`);
        navigation.goBack();
      });
    } else {
      Alert.alert('Error', "Title and Release Year can't be empty");
    }
  };

  return (
    <PageContainer>
      <AppbarHeader title={'Add Movie'} goBack={navigation.goBack} />
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
            label="Add"
            onPress={onPressAdd}
            colors={['#05E560', '#04AF49']}
            labelColor={'#FFF'}
          />
        </ScrollView>
        <Spacer />
      </RoundedContainer>
    </PageContainer>
  );
}

export const MovieAdd = connect()(MovieAddScreen);
