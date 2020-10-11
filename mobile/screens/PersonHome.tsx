import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import Collapsible from 'react-native-collapsible';
import { RouteProp, useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import RoundedContainer from '../components/RoundedContainer';
import GradientButton from '../components/GradientButton';
import Card, { CardProps } from '../components/Card';
import AppbarHeader from '../components/AppbarHeader';

import Globals from '../utils/Globals';

import { View } from '../components/Themed';
import { rspHeight } from '../utils/Responsive';
import { PersonTabParamList } from '../types';
import { getPeople, MovieData, PersonData } from '../services/Api';

type PersonHomeScreenProps = {
  route: RouteProp<PersonTabParamList, 'PersonHome'>;
};
export default function PersonHomeScreen({ route }: PersonHomeScreenProps) {
  const navigation = useNavigation();
  const [authAreaHidden, setAuthAreaHidden] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [people, setPeople] = useState([] as PersonData[]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMoreButtonHidden, setLoadMoreButtonVisible] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => fetchPeople());
    fetchPeople();

    console.log(route);

    const person = _.get(route, ['params', 'person']);
    if (person !== undefined) {
      console.log('person:', person.first_name);
      navigation.navigate('PersonDetail', { person });
    }
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
      if (response && response.meta) {
        const { current_page, last_page } = response.meta;
        setLoadMoreButtonVisible(current_page === last_page);
      }
    });
  };

  const loadMore = () => {
    setPage(page + 1);
    fetchPeople();
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
              onPress: () => navigation.navigate('PersonDetail', { person })
            };

            return <Card key={key.toString()} {...props} />;
          })}
          <Collapsible collapsed={loadMoreButtonHidden}>
            <GradientButton
              icon="plus"
              label="Add Movie"
              onPress={loadMore}
              colors={['#EEEEEE', '#FFFFFF']}
              labelColor={'#333333'}
            />
          </Collapsible>
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