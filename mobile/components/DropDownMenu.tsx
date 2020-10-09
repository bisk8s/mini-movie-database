import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Menu, Text } from 'react-native-paper';
import { isEmpty, map } from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { rspHeight } from '../utils/Responsive';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

type DropDownMenuProp = {
  items: string[];
  onChange?: (label: string) => void;
};
export default function DropDownMenu({ items, onChange }: DropDownMenuProp) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [selected, setSelected] = React.useState('');
  const colorScheme = useColorScheme();

  const borderColor = Colors[colorScheme].tint;
  const color = Colors[colorScheme].tint;

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      style={{
        width: '85%'
      }}
      anchor={
        <TouchableOpacity onPress={openMenu} style={[styles.container, { borderColor }]}>
          <View style={styles.content}>
            <Text style={{ color }}>{isEmpty(selected) ? 'Selecione' : selected}</Text>
            <MaterialCommunityIcons name="chevron-down" size={rspHeight(50)} color={color} />
          </View>
        </TouchableOpacity>
      }
    >
      {map(items, (title, key) => (
        <Menu.Item
          {...{ title, key }}
          titleStyle={{ color }}
          onPress={() => {
            closeMenu();
            setSelected(title);
            onChange && onChange(title);
          }}
        />
      ))}
    </Menu>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: rspHeight(5),
    alignItems: 'flex-start'
  },
  content: {
    width: '100%',
    padding: rspHeight(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
