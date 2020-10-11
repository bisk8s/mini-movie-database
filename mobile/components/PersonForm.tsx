import React, { useState } from 'react';
import { StyleSheet, View as DefaultView } from 'react-native';
import { Chip, Menu, TextInput } from 'react-native-paper';
import _ from 'lodash';

import { Spacer } from '../components/Themed';

import { getPeople, PersonData, removeRelationship } from '../services/Api';
import { rspHeight } from '../utils/Responsive';
import Globals from '../utils/Globals';

type PersonFormProps = {
  label: string;
  selectedPeople: PersonData[];
  setSelectedPeople: (people: PersonData[]) => void;
  type: 'casting' | 'producer' | 'director';
};
export function PersonForm({
  label,
  selectedPeople,
  setSelectedPeople,
  type
}: PersonFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [people, setPeople] = useState<PersonData[]>([]);

  const fetchPeople = async () => {
    getPeople(searchQuery, 1).then(response => {
      if (response) {
        setPeople(response.data);
      }
    });
  };
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onSearchClick = (person: PersonData) => {
    const selected = _.uniq(selectedPeople.concat([person]));
    setSelectedPeople(selected);
  };
  const onChipPress = (person: PersonData) => {
    const { token } = Globals;
    removeRelationship(person.id, type, token);

    const selected = _.without(selectedPeople, person);
    setSelectedPeople(selected);
  };

  const onChangeText = (text: string) => {
    setSearchQuery(text);
    fetchPeople();
  };

  return (
    <DefaultView>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TextInput
            mode="outlined"
            label={label}
            onChangeText={onChangeText}
            value={searchQuery}
            onChange={openMenu}
          />
        }
        style={{ marginTop: rspHeight(190) }}
      >
        {_.map(people, person => {
          return (
            <Menu.Item
              key={person.id}
              title={`${person.first_name} ${person.last_name}`}
              onPress={() => onSearchClick(person)}
            />
          );
        })}
      </Menu>
      <Spacer />
      <DefaultView
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <DefaultView style={styles.chipsView}>
          {_.map(selectedPeople, person => {
            return (
              <Chip
                key={person.id}
                onPress={() => onChipPress(person)}
                style={styles.chipStyle}
                icon="close"
              >
                {`${person.first_name} ${person.last_name}`}
              </Chip>
            );
          })}
        </DefaultView>
      </DefaultView>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
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
