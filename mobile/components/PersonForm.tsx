import React, { useState } from 'react';
import { View as DefaultView } from 'react-native';
import { Chip, Menu, TextInput } from 'react-native-paper';
import _ from 'lodash';

import { Spacer } from '../components/Themed';

import { getPeople, PersonData } from '../services/Api';
import { rspHeight } from '../utils/Responsive';

type PersonFormProps = {
  label: string;
  selectedPeople: PersonData[];
  setSelectedPeople: (people: PersonData[]) => void;
};
export function PersonForm({
  label,
  selectedPeople,
  setSelectedPeople
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
              onPress={() => {
                const selected = _.uniq(selectedPeople.concat([person]));
                setSelectedPeople(selected);
              }}
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
        {_.map(selectedPeople, person => {
          return (
            <Chip key={person.id}>
              {`${person.first_name} ${person.last_name}`}
            </Chip>
          );
        })}
      </DefaultView>
    </DefaultView>
  );
}
