import { DefaultTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/src/types';
import Colors from './Colors';

const fontConfig = {
  regular: {
    fontFamily: 'roboto-regular',
    fontWeight: 'normal'
  },
  medium: {
    fontFamily: 'roboto-medium',
    fontWeight: 'normal'
  },
  light: {
    fontFamily: 'roboto-light',
    fontWeight: 'normal'
  },
  thin: {
    fontFamily: 'roboto-thin',
    fontWeight: 'normal'
  }
};

export const roundness = 7;

export const DefaultPaperTheme = {
  ...DefaultTheme,
  fonts: fontConfig,
  roundness,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.tint,
    accent: Colors.accent,
    background: Colors.background,
    borderColor: Colors.borderColor
  }
} as Theme;

export default DefaultPaperTheme as Theme;
