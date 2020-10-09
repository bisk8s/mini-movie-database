import React from 'react';
import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput
} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { rspHeight, rspWidth } from '../utils/Responsive';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export type ViewProps = ThemeProps & DefaultView['props'];
export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export function TextInput(props: TextInputProps) {
  const {
    style,
    placeholderTextColor,
    lightColor,
    darkColor,
    ...otherProps
  } = props;
  return (
    <DefaultView
      style={{
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 7
      }}
    >
      <DefaultTextInput
        style={[
          {
            height: rspHeight(130),
            paddingHorizontal: rspWidth(50),
            textTransform: 'none',
            fontFamily: 'nunito-light',
            fontSize: rspHeight(38)
          },
          style
        ]}
        placeholderTextColor={placeholderTextColor || '#FFF'}
        {...otherProps}
      />
    </DefaultView>
  );
}

export function Spacer({ height = 12 }) {
  return <DefaultView style={{ height }} />;
}
