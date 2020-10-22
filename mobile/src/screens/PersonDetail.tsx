import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import RoundedContainer from '../components/RoundedContainer';
import AppbarHeader from '../components/AppbarHeader';
import { rspHeight } from '../utils/Responsive';

import { PersonTabParamList } from '../types';
import OptionButton from '../components/OptionButton';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { getPerson, PersonData, removePerson } from '../services/Api';
import _ from 'lodash';
import { Button, Chip, Dialog, Divider, Paragraph, Portal, Title } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';

type ScreenProps = {
  route: RouteProp<PersonTabParamList, 'PersonDetail'>;
};
type MoviesProps = {
  type: 'moviesAsActor' | 'moviesAsDirector' | 'moviesAsProducer';
};

export default function PersonDetailScreen({ route }: ScreenProps) {
  const navigation = useNavigation();
  const [dialogVisible, setVisible] = React.useState(false);
  const [authAreaHidden, setAuthAreaHidden] = useState(true);
  const [person, setPerson] = useState<PersonData | undefined>(undefined);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const deleteItem = () => {
    const token = '';
    if (person) removePerson(person.id, token);
    setVisible(false);
    navigation.goBack();
  };

  useEffect(() => {
    setPerson(route.params.person);
    navigation.addListener('focus', () => fetchToken());
    fetchToken();
  }, []);

  const fetchToken = async () => {
    const token = '';
    setAuthAreaHidden(!token);

    getPerson(route.params.person.id).then(p => {
      if (p) {
        setPerson(p);
      }
    });
  };

  const Movies = ({ type }: MoviesProps) => {
    return (
      <View style={styles.chipsView}>
        {_.map(_.get(person, type), movie => {
          return (
            <Chip
              key={movie?.id}
              style={styles.chipStyle}
              onPress={() => {
                const parent = navigation.dangerouslyGetParent();
                if (parent) {
                  parent.navigate('MovieDetail', { movie });
                }
              }}
            >
              {movie.title} ({movie.release_year})
            </Chip>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppbarHeader title={person ? `${person?.first_name} ${person?.last_name}` : ''} goBack={navigation.goBack} />
      <RoundedContainer>
        <ScrollView>
          <Paragraph>Name</Paragraph>
          <Title>{person?.first_name}</Title>
          <Paragraph>Surname</Paragraph>
          <Title>{person?.last_name}</Title>
          <Paragraph>Aliases</Paragraph>
          <Title>{person?.aliases.join(', ')}</Title>
          <Divider />

          <Paragraph>Movies as Actor</Paragraph>
          <Movies type="moviesAsActor" />
          <Divider />

          <Paragraph>Movies as Director</Paragraph>
          <Movies type="moviesAsDirector" />
          <Divider />

          <Paragraph>Movies as Producer</Paragraph>
          <Movies type="moviesAsProducer" />
          <Divider />

          <Collapsible collapsed={authAreaHidden}>
            <View style={styles.buttonsWrapper}>
              <OptionButton
                color="#E9679D"
                icon="account-edit"
                text="Edit"
                onPress={() => {
                  navigation.navigate('PersonEdit', { person });
                }}
              />

              <OptionButton color="#E9679D" icon="account-remove" text="remove" onPress={showDialog} />
            </View>
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
