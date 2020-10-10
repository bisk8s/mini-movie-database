import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import _ from 'lodash';

import { View } from '../components/Themed';
import { rspHeight } from '../utils/Responsive';
import { PersonTabParamList } from '../types';

import RoundedContainer from '../components/RoundedContainer';
import GradientButton from '../components/GradientButton';
import Card, { CardProps } from '../components/Card';
import AppbarHeader from '../components/AppbarHeader';

import Collapsible from 'react-native-collapsible';
import { getPeople, MovieData, PersonData } from '../services/Api';
import Globals from '../utils/Globals';

type PersonHomeScreenProps = {
  navigation: StackNavigationProp<PersonTabParamList>;
};
export default function PersonHomeScreen({
  navigation
}: PersonHomeScreenProps) {
  const [authAreaHidden, setAuthAreaHidden] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [people, setPeople] = useState([] as PersonData[]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => fetchPeople());
    fetchPeople();
  }, []);

  const fetchPeople = async (sq?: string) => {
    const { token } = Globals;
    setAuthAreaHidden(!(token && token.length > 0));

    const query = sq !== undefined ? sq : searchQuery;
    getPeople(query, page).then(response => {
      if (response) {
        setPeople(response.data);
      }
      setRefreshing(false);
    });
  };

  const onChangeSearch = (sq: string) => {
    setSearchQuery(sq);
    fetchPeople(sq);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPeople();
  }, []);

  const movieTosubItem = (movies: MovieData[]) => {
    return _.map(movies, movie => {
      return {
        id: movie.id,
        title: movie.title
      };
    });
  };

  return (
    <View style={styles.container}>
      <AppbarHeader title={'People'} />
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
              label="Add Person"
              onPress={() => navigation.navigate('PersonAdd')}
              colors={['#05E560', '#04AF49']}
              labelColor={'#FFF'}
            />
          </Collapsible>
          {_.map(people, (person, key) => {
            let props: CardProps = {
              title: `${person.first_name} ${person.last_name}`,
              subtitle: person.aliases.join(),
              relationships: [],
              onPress: () => navigation.navigate('PersonDetail')
            };

            if (person.moviesAsActor?.length) {
              props.relationships.push({
                title: 'Acted in',
                subitems: movieTosubItem(person.moviesAsActor)
              });
            }

            if (person.moviesAsProducer?.length) {
              props.relationships.push({
                title: 'Produced',
                subitems: movieTosubItem(person.moviesAsProducer)
              });
            }

            if (person.moviesAsDirector?.length) {
              props.relationships.push({
                title: 'Directed',
                subitems: movieTosubItem(person.moviesAsDirector)
              });
            }

            return <Card key={key.toString()} {...props} />;
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
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rspHeight(24)
  }
});
