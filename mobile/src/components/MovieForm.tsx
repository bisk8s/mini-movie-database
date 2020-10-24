import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Menu, TextInput } from 'react-native-paper';
import _ from 'lodash';

import { Spacer } from '../components';

import { getMovies, MovieData, removeRelationship } from '../services/Api';
import { rspHeight } from '../utils/Responsive';

type MovieFormProps = {
  label: string;
  selectedMovies: MovieData[];
  setSelectedMovies: (movies: MovieData[]) => void;
  type: 'casting' | 'producer' | 'director';
};
export function MovieForm({ label, selectedMovies, setSelectedMovies, type }: MovieFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [movies, setMovies] = useState<MovieData[]>([]);

  const fetchMovie = async () => {
    getMovies(searchQuery, 1).then(response => {
      if (response) {
        setMovies(response.data);
      }
    });
  };
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onSearchClick = (movie: MovieData) => {
    const selected = _.uniq(selectedMovies.concat([movie]));
    setSelectedMovies(selected);
  };
  const token = '';
  const onChipPress = (movie: MovieData) => {
    removeRelationship(movie.id, type, token);

    const selected = _.without(selectedMovies, movie);
    setSelectedMovies(selected);
  };

  const onChangeText = (text: string) => {
    setSearchQuery(text);
    fetchMovie();
  };

  return (
    <View>
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
        {_.map(movies, movie => {
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <View style={styles.chipsView}>
          {_.map(selectedMovies, movie => {
            return (
              <Chip key={movie.id} onPress={() => onChipPress(movie)} icon="close">
                {`${movie.title} (${movie.release_year})`}
              </Chip>
            );
          })}
        </View>
      </View>
    </View>
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
