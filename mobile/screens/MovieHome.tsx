import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View as DefaultView } from 'react-native';
import { Searchbar, Chip, Button, Portal, Dialog } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { map, times } from 'lodash';

import { View } from '../components/Themed';
import { rspHeight, rspWidth } from '../utils/Responsive';
import { MovieTabParamList } from '../types';

import RoundedContainer from '../components/RoundedContainer';
import GradientButton from '../components/GradientButton';
import Card, { CardProps } from '../components/Card';
import AppbarHeader from '../components/AppbarHeader';

import Collapsible from 'react-native-collapsible';

type MovieHomeScreenProps = {
  navigation: StackNavigationProp<MovieTabParamList>;
};
export default function MovieHomeScreen({ navigation }: MovieHomeScreenProps) {
  const [addButtonHidden, setAddButtonHidden] = useState(true);

  const fetchData = async () => {};
  useEffect(() => {
    fetchData();
  }, []);

  const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
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
    const cards: CardProps[] = times(3, Movie => {
      return {
        title: 'name',
        subtitle: 'subtitle',
        image: {
          uri:
            'https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_UX182_CR0,0,182,268_AL_.jpg'
        },
        onPress: () => navigation.navigate('MovieDetail')
      };
    });

    return (
      <>
        {map(cards, (props, key) => (
          <Card key={key.toString()} {...props} />
        ))}
      </>
    );
  };

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
