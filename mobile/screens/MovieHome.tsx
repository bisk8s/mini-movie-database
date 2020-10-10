import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
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
import Globals from '../utils/Globals';

type MovieHomeScreenProps = {
  navigation: StackNavigationProp<MovieTabParamList>;
};
export default function MovieHomeScreen({ navigation }: MovieHomeScreenProps) {
  const [authAreaHidden, setAuthAreaHidden] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([] as MovieData[]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => fetchMovies());
    fetchMovies();
  }, []);

  const fetchMovies = async (sq?: string) => {
    const { token } = Globals;
    setAuthAreaHidden(!(token && token.length > 0));

    const query = sq !== undefined ? sq : searchQuery;
    getMovies(query, page).then(response => {
      response && setMovies(response.data);
      setRefreshing(false);
    });
  };

  const onChangeSearch = (sq: string) => {
    setSearchQuery(sq);
    fetchMovies(sq);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMovies();
  }, []);

  const personTosubItem = (movies: PersonData[]) => {
    return _.map(movies, movie => {
      return {
        id: movie.id,
        title: `${movie.first_name} ${movie.last_name}`
      };
    });
  };

  return (
    <View style={styles.container}>
      <AppbarHeader title={'Movies'} />
      <RoundedContainer>
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Searchbar
            style={styles.searchbar}
            placeholder="Search"
            // onChangeText won't work properly // https://github.com/facebook/react-native/issues/13251
            // onChangeText={onChangeSearch}
            onChange={e => onChangeSearch(e.nativeEvent.text)}
            value={searchQuery}
          />
          <Collapsible collapsed={authAreaHidden}>
            <GradientButton
              icon="plus"
              label="Add Movie"
              onPress={() => navigation.navigate('MovieAdd')}
              colors={['#05E560', '#04AF49']}
              labelColor={'#FFF'}
            />
          </Collapsible>
          {_.map(movies, movie => {
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

            return <Card key={movie.id.toString()} {...props} />;
          })}
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
  }
});
