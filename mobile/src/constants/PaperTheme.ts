import { DarkTheme, DefaultTheme as LigthTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/src/types';

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
  ...LigthTheme,
  fonts: fontConfig,
  roundness,
  colors: {
    ...LigthTheme.colors,
    primary: '#43BAEA',
    accent: '#7C7C7C',
    background: '#FFFFFF',
    borderColor: '#FFFFFF'
  }
} as Theme;

export const AlternativeTheme = {
  ...DarkTheme,
  fonts: fontConfig,
  roundness,
  colors: {
    ...DarkTheme.colors,
    primary: '#7C7C7C',
    accent: '#1780A3'
  }
} as Theme;

export default DefaultPaperTheme as Theme;
