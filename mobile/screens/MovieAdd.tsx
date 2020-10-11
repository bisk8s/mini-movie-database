import React, { useState } from 'react';
import { Alert, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import _ from 'lodash';

import { View, Spacer } from '../components/Themed';

import RoundedContainer from '../components/RoundedContainer';

import AppbarHeader from '../components/AppbarHeader';
import GradientButton from '../components/GradientButton';
import { addMovie, getPeople, PersonData } from '../services/Api';
import Globals from '../utils/Globals';
import { useNavigation } from '@react-navigation/native';
import { PersonForm } from '../components/PersonForm';

export default function MovieAdddScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  const [casting, setCasting] = useState<PersonData[]>([]);
  const [producers, setProducers] = useState<PersonData[]>([]);
  const [directors, setdirectors] = useState<PersonData[]>([]);

  const onPressAdd = () => {
    const { token } = Globals;
    if (title.length && releaseYear.length) {
      addMovie(
        title,
        parseFloat(releaseYear),
        token,
        casting,
        producers,
        directors
      ).then(movie => {
        Alert.alert('Movie Added', `${movie?.title} added`);
        navigation.goBack();
      });
    } else {
      Alert.alert('Error', "Title and Release Year can't be empty");
    }
  };

  return (
    <View style={styles.container}>
      <AppbarHeader title={'Add Movie'} goBack={navigation.goBack} />
      <RoundedContainer style={{ overflow: 'visible' }}>
        <ScrollView>
          <TextInput
            mode="outlined"
            label="Title"
            onChangeText={setTitle}
            value={title}
          />
          <Spacer />
          <TextInput
            mode="outlined"
            label="Release Year"
            keyboardType="numeric"
            onChangeText={setReleaseYear}
            value={releaseYear}
          />
          <Spacer />

          <PersonForm
            label="Casting"
            setSelectedPeople={setCasting}
            selectedPeople={casting}
          />
          <Spacer />

          <PersonForm
            label="Producers"
            setSelectedPeople={setProducers}
            selectedPeople={producers}
          />
          <Spacer />

          <PersonForm
            label="Directors"
            setSelectedPeople={setdirectors}
            selectedPeople={directors}
          />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
