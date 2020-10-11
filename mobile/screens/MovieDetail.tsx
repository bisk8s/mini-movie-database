import React, { useEffect, useState } from 'react';
import { StyleSheet, View as DefaultView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { View } from '../components/Themed';
import RoundedContainer from '../components/RoundedContainer';
import AppbarHeader from '../components/AppbarHeader';
import { rspHeight } from '../utils/Responsive';

import { MovieTabParamList } from '../types';
import OptionButton from '../components/OptionButton';
import Globals from '../utils/Globals';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { MovieData } from '../services/Api';
import Collapsible from 'react-native-collapsible';
import { Chip, Paragraph, Title } from 'react-native-paper';
import _ from 'lodash';

type ScreenProps = {
  route: RouteProp<MovieTabParamList, 'MovieDetail'>;
};
type PeopleProps = { type: string };

export default function MovieDetailScreen({ route }: ScreenProps) {
  const navigation = useNavigation();
  const [authAreaHidden, setAuthAreaHidden] = useState(true);
  const [movie, setMovie] = useState<MovieData | undefined>(undefined);

  useEffect(() => {
    setMovie(route.params.movie);
    navigation.addListener('focus', () => fetchToken());
    fetchToken();
  }, []);

  const fetchToken = async () => {
    const { token } = Globals;
    setAuthAreaHidden(!(token && token.length > 0));
  };

  const People = ({ type }: PeopleProps) => {
    return (
      <DefaultView style={styles.chipsView}>
        {_.map(_.get(movie, type), person => {
          return (
            <Chip
              key={person?.id}
              onPress={() => {
                navigation.navigate('PersonDetail', { person });
              }}
            >
              {person.first_name} {person.last_name}
            </Chip>
          );
        })}
      </DefaultView>
    );
  };

  return (
    <View style={styles.container}>
      <AppbarHeader
        title={movie ? `${movie.title} (${movie.release_year})` : ''}
        goBack={navigation.goBack}
      />
      <RoundedContainer>
        <Paragraph>Title</Paragraph>
        <Title>{movie?.title}</Title>
        <Paragraph>Release Year</Paragraph>
        <Title>
          {movie?.release_year} ({movie?.releaseYearRoman})
        </Title>
        <Paragraph>Casting</Paragraph>

        <People type="casting" />

        <Paragraph>Producers</Paragraph>
        <Paragraph>Directors</Paragraph>

        <Collapsible collapsed={authAreaHidden}>
          <DefaultView style={styles.buttonsWrapper}>
            <OptionButton
              color="#E9679D"
              icon="file-document-box-outline"
              text="Edit"
              onPress={() => {}}
            />

            <OptionButton
              color="#E9679D"
              icon="file-document-box-remove-outline"
              text="remove"
              onPress={() => {}}
            />
          </DefaultView>
        </Collapsible>
      </RoundedContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  buttonsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: rspHeight(24)
  },

  chipsView: { flexDirection: 'row' }
});
