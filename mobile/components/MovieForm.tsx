import React, { useState } from 'react';
import { View as DefaultView } from 'react-native';
import { Chip, Menu, TextInput } from 'react-native-paper';
import _ from 'lodash';

import { Spacer } from '../components/Themed';

import { getMovies, MovieData } from '../services/Api';
import { rspHeight } from '../utils/Responsive';

type MovieFormProps = {
  label: string;
  selectedMovies: MovieData[];
  setSelectedMovies: (movies: MovieData[]) => void;
};
export function MovieForm({
  label,
  selectedMovies,
  setSelectedMovies
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
              onPress={() => {
                const selected = _.uniq(selectedMovies.concat([movie]));
                setSelectedMovies(selected);
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
        {_.map(selectedMovies, movie => {
          return (
            <Chip key={movie.id}>
              {`${movie.title} (${movie.release_year})`}
            </Chip>
          );
        })}
      </DefaultView>
    </DefaultView>
  );
}
