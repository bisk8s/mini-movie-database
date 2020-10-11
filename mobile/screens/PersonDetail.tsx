import React, { useEffect, useState } from 'react';
import { StyleSheet, View as DefaultView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { View } from '../components/Themed';
import RoundedContainer from '../components/RoundedContainer';
import AppbarHeader from '../components/AppbarHeader';
import { rspHeight } from '../utils/Responsive';

import { PersonTabParamList } from '../types';
import OptionButton from '../components/OptionButton';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Globals from '../utils/Globals';
import { PersonData } from '../services/Api';
import _ from 'lodash';
import { Chip } from 'react-native-paper';

type ScreenProps = {
  route: RouteProp<PersonTabParamList, 'PersonDetail'>;
};
type MoviesProps = { type: string };

export default function PersonDetailScreen({ route }: ScreenProps) {
  const navigation = useNavigation();
  const [authAreaHidden, setAuthAreaHidden] = useState(true);
  const [person, setPerson] = useState<PersonData | undefined>(undefined);

  useEffect(() => {
    setPerson(route.params.person);
    navigation.addListener('focus', () => fetchToken());
    fetchToken();
  }, []);

  const fetchToken = async () => {
    const { token } = Globals;
    setAuthAreaHidden(!(token && token.length > 0));
  };

  const Movies = ({ type }: MoviesProps) => {
    return (
      <DefaultView style={styles.chipsView}>
        {_.map(_.get(person, type), person => {
          return (
            <Chip
              key={person?.id}
              onPress={() => {
                const parent = navigation.dangerouslyGetParent();
                if (parent) {
                  parent.navigate('PersonTab', { person });
                }
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
        title={person ? `${person?.first_name} ${person?.last_name}` : ''}
        goBack={navigation.goBack}
      />
      <RoundedContainer>
        <DefaultView style={styles.buttonsWrapper}>
          <OptionButton
            color="#E9679D"
            icon="account-edit"
            text="Edit"
            onPress={() => {}}
          />

          <OptionButton
            color="#E9679D"
            icon="account-remove"
            text="remove"
            onPress={() => {}}
          />
        </DefaultView>
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
