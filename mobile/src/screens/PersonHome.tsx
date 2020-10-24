import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { RouteProp, useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import { rspHeight } from '../utils/Responsive';
import { PersonTabParamList } from '../types';
import { getPeople, MovieData, PersonData } from '../services/Api';

import { RoundedContainer, GradientButton, Card, CardProps, AppbarHeader, PageContainer } from '../components';

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
  const [prevPageButtonHidden, setPrevPageButtonHidden] = useState(true);
  const [nextPageButtonHidden, setNextPageButtonHidden] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => fetchPeople());
    fetchPeople();

    const person = _.get(route, ['params', 'person']);
    if (person !== undefined) {
      navigation.navigate('PersonDetail', { person });
    }
  }, []);

  const fetchPeople = async (sq?: string, p?: number) => {
    // const { token } = Globals;
    // setAuthAreaHidden(!(token && token.length > 0));

    const query = sq !== undefined ? sq : searchQuery;
    getPeople(query, p || page).then(response => {
      if (response) {
        setPeople(response.data);
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
    fetchPeople(undefined, page - 1);
  };

  const nextPage = () => {
    fetchPeople(undefined, page + 1);
  };

  const onChangeSearch = (sq: string) => {
    setSearchQuery(sq);
    fetchPeople(sq);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPeople();
  }, []);

  return (
    <PageContainer>
      <AppbarHeader title={'People'} />
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
              label="Add Person"
              onPress={() => navigation.navigate('PersonAdd')}
              colors={['#05E560', '#04AF49']}
              labelColor={'#FFF'}
            />
          </Collapsible>
          {_.map(people, (person, key) => {
            const props: CardProps = {
              title: `${person.first_name} ${person.last_name}`,
              subtitle: person.aliases.join(),
              onPress: () => navigation.navigate('PersonDetail', { person })
            };

            return <Card key={key.toString()} {...props} />;
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
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rspHeight(24)
  }
});
