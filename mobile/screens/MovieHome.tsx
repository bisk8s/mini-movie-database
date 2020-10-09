import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import _ from 'lodash';

import { View } from '../components/Themed';
import { rspHeight } from '../utils/Responsive';
import { MovieTabParamList } from '../types';

import RoundedContainer from '../components/RoundedContainer';
import GradientButton from '../components/GradientButton';
import Card, { CardProps } from '../components/Card';
import AppbarHeader from '../components/AppbarHeader';

import Collapsible from 'react-native-collapsible';
import { PersonData, MovieData, getMovies } from '../services/Api';

type MovieHomeScreenProps = {
  navigation: StackNavigationProp<MovieTabParamList>;
};
export default function MovieHomeScreen({ navigation }: MovieHomeScreenProps) {
  const [addButtonHidden, setAddButtonHidden] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = React.useState([] as MovieData[]);

  const fetchData = async () => {
    getMovies(searchQuery, page).then(response => {
      if (response) {
        setMovies(response.data);
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const Search = () => {
    return (
      <Searchbar
        style={styles.searchbar}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    );
  };

  const MovieCards = () => {
    return (
      <>
        {_.map(movies, (movie, key) => {
          let props: CardProps = {
            title: movie.title,
            subtitle: `${movie.release_year} (${movie.releaseYearRoman})`,
            relationships: [],
            onPress: () => navigation.navigate('MovieDetail')
          };

          if (movie.casting?.length) {
            props.relationships.push({
              title: 'Casting',
              subitems: personTosubItem(movie.casting)
            });
          }

          if (movie.producers?.length) {
            props.relationships.push({
              title: 'Producers',
              subitems: personTosubItem(movie.producers)
            });
          }

          if (movie.directors?.length) {
            props.relationships.push({
              title: 'Directors',
              subitems: personTosubItem(movie.directors)
            });
          }

          return <Card key={key.toString()} {...props} />;
        })}
      </>
    );
  };

  function personTosubItem(movies: PersonData[]) {
    return _.map(movies, movie => {
      return {
        id: movie.id,
        title: `${movie.first_name} ${movie.last_name}`
      };
    });
  }

  return (
    <View style={styles.container}>
      <AppbarHeader title={'Movies'} />
      <RoundedContainer>
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
        >
          <Search />
          <Collapsible collapsed={addButtonHidden}>
            <GradientButton
              icon="plus"
              label="Add Movie"
              onPress={() => navigation.navigate('MovieAdd')}
              colors={['#05E560', '#04AF49']}
              labelColor={'#FFF'}
            />
          </Collapsible>
          <MovieCards />
        </ScrollView>
      </RoundedContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollview: {
    height: '100%',
    overflow: 'visible'
  },
  searchbar: {
    marginBottom: rspHeight(25)
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rspHeight(24)
  }
});
