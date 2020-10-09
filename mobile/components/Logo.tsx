import React from 'react';
import { Title } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';

import { rspWidth, rspHeight } from '../utils/Responsive';

type Logo = View['props'] & {
  borderStyle?: View['props']['style'];
  titleStyle?: Text['props']['style'];
};

export default function Logo({ style, borderStyle, titleStyle }: Logo) {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.border, borderStyle]} />
      <Title style={[styles.title, titleStyle]}>MMDB</Title>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  border: {
    width: rspWidth(188),
    height: rspWidth(188),

    borderColor: '#027391',
    backgroundColor: '#fff',

    borderRadius: rspWidth(188),
    borderWidth: rspWidth(6)
  },
  title: {
    color: '#024E60',
    fontFamily: 'nunito-bold',
    fontSize: rspHeight(34)
  }
});
