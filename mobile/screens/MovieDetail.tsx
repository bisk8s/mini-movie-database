import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View as DefaultView } from 'react-native';

import { View } from '../components/Themed';
import RoundedContainer from '../components/RoundedContainer';
import AppbarHeader from '../components/AppbarHeader';
import { rspHeight } from '../utils/Responsive';

import { MovieTabParamList } from '../types';
import OptionButton from '../components/OptionButton';
import Globals from '../utils/Globals';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { getMovie, MovieData, removeMovie } from '../services/Api';
import Collapsible from 'react-native-collapsible';
import {
  Button,
  Chip,
  Dialog,
  Divider,
  Paragraph,
  Portal,
  Title
} from 'react-native-paper';
import _ from 'lodash';

type ScreenProps = {
  route: RouteProp<MovieTabParamList, 'MovieDetail'>;
};
type PeopleProps = { type: 'casting' | 'directors' | 'producers' };

export default function MovieDetailScreen({ route }: ScreenProps) {
  const navigation = useNavigation();
  const [dialogVisible, setVisible] = React.useState(false);
  const [authAreaHidden, setAuthAreaHidden] = useState(true);
  const [movie, setMovie] = useState<MovieData | undefined>(undefined);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const deleteItem = () => {
    const { token } = Globals;
    if (movie) removeMovie(movie.id, token);
    setVisible(false);
    navigation.goBack();
  };

  useEffect(() => {
    setMovie(route.params.movie);
    navigation.addListener('focus', () => fetchData());
    fetchData();
  }, []);

  const fetchData = async () => {
    const { token } = Globals;
    setAuthAreaHidden(!(token && token.length > 0));

    getMovie(route.params.movie.id).then(m => {
      if (m) {
        setMovie(m);
      }
    });
  };

  const People = ({ type }: PeopleProps) => {
    return (
      <DefaultView style={styles.chipsView}>
        {_.map(_.get(movie, type), person => {
          return (
            <Chip
              key={person?.id}
              style={styles.chipStyle}
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
        <ScrollView>
          <Paragraph>Title</Paragraph>
          <Title>{movie?.title}</Title>
          <Paragraph>Release Year</Paragraph>
          <Title>
            {movie?.release_year} ({movie?.releaseYearRoman})
          </Title>
          <Divider />

          <Paragraph>Casting</Paragraph>
          <People type="casting" />
          <Divider />

          <Paragraph>Producers</Paragraph>
          <People type="producers" />
          <Divider />

          <Paragraph>Directors</Paragraph>
          <People type="directors" />
          <Divider />

          <Collapsible collapsed={authAreaHidden}>
            <DefaultView style={styles.buttonsWrapper}>
              <OptionButton
                color="#E9679D"
                icon="file-document-box-outline"
                text="Edit"
                onPress={() => {
                  navigation.navigate('MovieEdit', { movie });
                }}
              />

              <OptionButton
                color="#E9679D"
                icon="file-document-box-remove-outline"
                text="remove"
                onPress={showDialog}
              />
            </DefaultView>
          </Collapsible>
        </ScrollView>
      </RoundedContainer>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Confirm Deletion</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={deleteItem}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    paddingTop: rspHeight(48)
  },

  chipsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginVertical: rspHeight(24)
  },
  chipStyle: {
    marginVertical: rspHeight(12)
  }
});
