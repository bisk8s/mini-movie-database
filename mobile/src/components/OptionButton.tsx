import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { rspWidth, rspHeight } from '../utils/Responsive';
import { IconButton, Surface } from 'react-native-paper';
import Colors from '../constants/Colors';

type OptionButtonProps = View['props'] & {
  text: string;
  color: string;
  icon: string;
  small?: boolean;
  onPress?: () => void;
};

export default function OptionButton({ style, text, icon, color, small, onPress }: OptionButtonProps) {
  return (
    <View style={[styles.wrapper, small ? styles.wrapperSmall : null, style]}>
      <Surface style={[styles.surface, small ? styles.surfaceSmall : null, { backgroundColor: color }]}>
        <IconButton icon={icon} color={Colors.text} size={rspWidth(small ? 60 : 90)} onPress={onPress} />
      </Surface>
      <Text style={styles.label}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33.33%'
  },
  wrapperSmall: {
    width: '25%'
  },
  surface: {
    width: rspWidth(150),
    height: rspWidth(150),
    borderRadius: rspWidth(150),
    justifyContent: 'center',
    alignItems: 'center'
  },
  surfaceSmall: {
    width: rspWidth(100),
    height: rspWidth(100),
    borderRadius: rspWidth(100)
  },
  label: {
    marginTop: rspHeight(24),
    marginBottom: rspHeight(48),
    color: Colors.tint,
    fontFamily: 'nunito-regular',
    fontSize: rspHeight(28)
  }
});
