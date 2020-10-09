import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
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

type PersonHomeScreenProps = {
  navigation: StackNavigationProp<PersonTabParamList>;
};
export default function PersonHomeScreen({
  navigation
}: PersonHomeScreenProps) {
  const [addButtonHidden, setAddButtonHidden] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [people, setPeople] = React.useState([] as PersonData[]);

  const fetchData = () => {
    getPeople(searchQuery, page).then(response => {
      if (response) {
        setPeople(response.data);
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

  const PersonCards = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <View style={styles.container}>
      <AppbarHeader title={'People'} />
      <RoundedContainer>
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
        >
          <Search />
          <Collapsible collapsed={addButtonHidden}>
            <GradientButton
              icon="plus"
              label="Add Person"
              onPress={() => navigation.navigate('PersonAdd')}
              colors={['#05E560', '#04AF49']}
              labelColor={'#FFF'}
            />
          </Collapsible>
          <PersonCards />
        </ScrollView>
      </RoundedContainer>
    </View>
  );

  function movieTosubItem(movies: MovieData[]) {
    return _.map(movies, movie => {
      return {
        id: movie.id,
        title: movie.title
      };
    });
  }
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
