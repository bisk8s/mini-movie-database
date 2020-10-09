import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { rspWidth, rspHeight } from '../utils/Responsive';

type RoundedContainerProps = View['props'];

export default function RoundedContainer({
  style,
  children
}: RoundedContainerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.powered}>Mini Movie DB</Text>
      <View style={[styles.internal, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F7F7F7',
    borderTopStartRadius: rspWidth(118),
    paddingTop: rspHeight(45)
  },
  internal: {
    overflow: 'hidden',
    paddingHorizontal: rspWidth(66)
  },
  powered: {
    position: 'absolute',
    bottom: rspHeight(26),
    right: rspWidth(85),

    fontFamily: 'nunito-regular',
    fontSize: rspHeight(30),
    color: '#408F85'
  }
});
