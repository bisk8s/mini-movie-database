import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  ScrollView,
  View as DefaultView
} from 'react-native';
import { Chip, Menu, TextInput } from 'react-native-paper';
import _ from 'lodash';

import { View, Spacer } from '../components/Themed';

import RoundedContainer from '../components/RoundedContainer';

import AppbarHeader from '../components/AppbarHeader';
import GradientButton from '../components/GradientButton';
import { addMovie, getPeople, PersonData } from '../services/Api';
import Globals from '../utils/Globals';
import { useNavigation } from '@react-navigation/native';
import { rspHeight } from '../utils/Responsive';

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

  type PersonFormProps = {
    label: string;
    selectedPeople: PersonData[];
    setSelectedPeople: (people: PersonData[]) => void;
  };
  const PersonForm = ({
    label,
    selectedPeople,
    setSelectedPeople
  }: PersonFormProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [people, setPeople] = useState<PersonData[]>([]);

    const fetchPeople = async () => {
      getPeople(searchQuery, 1).then(response => {
        if (response) {
          setPeople(response.data);
        }
      });
    };
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const onChangeText = (text: string) => {
      setSearchQuery(text);
      fetchPeople();
    };

    return (
      <DefaultView>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TextInput
              mode="outlined"
              label={label}
              onChangeText={onChangeText}
              value={searchQuery}
              onChange={openMenu}
            />
          }
          style={{ marginTop: rspHeight(190) }}
        >
          {_.map(people, person => {
            return (
              <Menu.Item
                key={person.id}
                title={`${person.first_name} ${person.last_name}`}
                onPress={() => {
                  const selected = _.uniq(selectedPeople.concat([person]));
                  setSelectedPeople(selected);
                }}
              />
            );
          })}
        </Menu>
        <Spacer />
        <DefaultView
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly'
          }}
        >
          {_.map(selectedPeople, person => {
            return (
              <Chip key={person.id}>
                {`${person.first_name} ${person.last_name}`}
              </Chip>
            );
          })}
        </DefaultView>
      </DefaultView>
    );
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
