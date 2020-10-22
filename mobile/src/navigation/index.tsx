import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React from 'react';

import { Provider } from 'react-native-paper';
import { DefaultPaperTheme } from '../constants/PaperTheme';

import LinkingConfiguration from './LinkingConfiguration';
import RootNavigator from './RootNavigator';

export default function Navigation() {
  const navigatorTheme = DefaultTheme;
  const rnPaperTheme = DefaultPaperTheme;
  return (
    <Provider theme={rnPaperTheme}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={navigatorTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
