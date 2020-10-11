import React, { useState } from 'react';
import { StyleSheet, View as DefaultView } from 'react-native';
import { Chip, Menu, TextInput } from 'react-native-paper';
import _ from 'lodash';

import { Spacer } from '../components/Themed';

import { getMovies, MovieData, removeRelationship } from '../services/Api';
import { rspHeight } from '../utils/Responsive';
import Globals from '../utils/Globals';

type MovieFormProps = {
  label: string;
  selectedMovies: MovieData[];
  setSelectedMovies: (movies: MovieData[]) => void;
  type: 'casting' | 'producer' | 'director';
};
export function MovieForm({
  label,
  selectedMovies,
  setSelectedMovies,
  type
}: MovieFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [people, setPeople] = useState<MovieData[]>([]);

  const fetchMovie = async () => {
    getMovies(searchQuery, 1).then(response => {
      if (response) {
        setPeople(response.data);
      }
    });
  };
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onSearchClick = (movie: MovieData) => {
    const selected = _.uniq(selectedMovies.concat([movie]));
    setSelectedMovies(selected);
  };
  const onChipPress = (movie: MovieData) => {
    const { token } = Globals;
    removeRelationship(movie.id, type, token);

    const selected = _.without(selectedMovies, movie);
    setSelectedMovies(selected);
  };

  const onChangeText = (text: string) => {
    setSearchQuery(text);
    fetchMovie();
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
        {_.map(people, movie => {
          return (
            <Menu.Item
              key={movie.id}
              title={`${movie.title} (${movie.release_year})`}
              onPress={() => onSearchClick(movie)}
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
        <DefaultView style={styles.chipsView}>
          {_.map(selectedMovies, movie => {
            return (
              <Chip
                key={movie.id}
                onPress={() => onChipPress(movie)}
                icon="close"
              >
                {`${movie.title} (${movie.release_year})`}
              </Chip>
            );
          })}
        </DefaultView>
      </DefaultView>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  chipsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginVertical: rspHeight(24)
  },
  chipStyle: {
    marginVertical: rspHeight(12)
  }
});
