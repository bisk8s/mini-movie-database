import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';

import _ from 'lodash';

import { rspHeight } from '../utils/Responsive';

import RoundedContainer from '../components/RoundedContainer';
import GradientButton from '../components/GradientButton';
import Card, { CardProps } from '../components/Card';
import AppbarHeader from '../components/AppbarHeader';

import Collapsible from 'react-native-collapsible';
import { MovieData, getMovies } from '../services/Api';
import { useNavigation } from '@react-navigation/native';
import PageContainer from '../components/PageContainer';

export default function MovieHomeScreen() {
  const navigation = useNavigation();
  const [authAreaHidden, setAuthAreaHidden] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([] as MovieData[]);
  const [refreshing, setRefreshing] = useState(false);
  const [prevPageButtonHidden, setPrevPageButtonHidden] = useState(true);
  const [nextPageButtonHidden, setNextPageButtonHidden] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => fetchMovies());
    fetchMovies();
  }, []);

  const fetchMovies = async (sq?: string, p?: number) => {
    const token = '';
    setAuthAreaHidden(!token);

    const query = sq !== undefined ? sq : searchQuery;

    getMovies(query, p || page).then(response => {
      if (response) {
        setMovies(response.data);
      }
      setRefreshing(false);
      if (response && response.meta) {
        const { first_page, current_page, last_page } = response.meta;
        setPage(current_page);

        setPrevPageButtonHidden(current_page <= first_page);
        setNextPageButtonHidden(current_page >= last_page);
      }
    });
  };

  const prevPage = () => {
    fetchMovies(undefined, page - 1);
  };

  const nextPage = () => {
    fetchMovies(undefined, page + 1);
  };

  const onChangeSearch = (sq: string) => {
    setSearchQuery(sq);
    fetchMovies(sq);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMovies();
  }, []);

  return (
    <PageContainer testID="MovieHome">
      <AppbarHeader title={'Movies'} />
      <RoundedContainer>
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
            const props: CardProps = {
              title: movie.title,
              subtitle: `${movie.release_year} (${movie.releaseYearRoman})`,
              onPress: () => navigation.navigate('MovieDetail', { movie })
            };
            return <Card key={movie.id.toString()} {...props} />;
          })}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly'
            }}
          >
            {!prevPageButtonHidden && (
              <Button mode="contained" onPress={prevPage}>
                Previous
              </Button>
            )}
            {!nextPageButtonHidden && (
              <Button mode="contained" onPress={nextPage}>
                Next
              </Button>
            )}
          </View>
        </ScrollView>
      </RoundedContainer>
    </PageContainer>
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
