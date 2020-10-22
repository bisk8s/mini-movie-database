import React from 'react';
import { Surface, Text } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { roundness } from '../constants/PaperTheme';

import { rspWidth, rspHeight } from '../utils/Responsive';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type GradientButtonProps = View['props'] & {
  label: string;
  icon: string;
  colors: string[];
  labelColor: string;
  onPress?: () => void;
};

export default function GradientButton({ style, icon, label, colors, labelColor, onPress }: GradientButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Surface style={styles.buttonWrapper}>
        <View style={styles.cutoutMask}>
          <LinearGradient
            // Background Linear Gradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.33, y: 0 }}
            style={styles.layer}
          />
          <View style={styles.labelIconWrapper}>
            <MaterialCommunityIcons
              style={styles.labelIcon}
              name={icon}
              size={styles.label.fontSize}
              color={labelColor}
            />
            <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'relative',
    elevation: 5,
    backgroundColor: 'transparent'
  },
  cutoutMask: {
    borderRadius: roundness,
    overflow: 'hidden'
  },
  layer: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%'
  },
  labelIconWrapper: {
    height: rspHeight(132),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelIcon: {
    marginRight: rspWidth(12)
  },
  label: {
    fontSize: rspHeight(38),
    fontFamily: 'nunito-regular'
  }
});
