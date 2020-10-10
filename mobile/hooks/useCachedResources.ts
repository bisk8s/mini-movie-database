import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          // Nunito
          'nunito-black': require('../assets/fonts/nunito/Nunito-Black.ttf'),
          'nunito-blackitalic': require('../assets/fonts/nunito/Nunito-BlackItalic.ttf'),
          'nunito-bold': require('../assets/fonts/nunito/Nunito-Bold.ttf'),
          'nunito-bolditalic': require('../assets/fonts/nunito/Nunito-BoldItalic.ttf'),
          'nunito-extrabold': require('../assets/fonts/nunito/Nunito-ExtraBold.ttf'),
          'nunito-extrabolditalic': require('../assets/fonts/nunito/Nunito-ExtraBoldItalic.ttf'),
          'nunito-extralight': require('../assets/fonts/nunito/Nunito-ExtraLight.ttf'),
          'nunito-extralightitalic': require('../assets/fonts/nunito/Nunito-ExtraLightItalic.ttf'),
          'nunito-italic': require('../assets/fonts/nunito/Nunito-Italic.ttf'),
          'nunito-light': require('../assets/fonts/nunito/Nunito-Light.ttf'),
          'nunito-lightitalic': require('../assets/fonts/nunito/Nunito-LightItalic.ttf'),
          'nunito-regular': require('../assets/fonts/nunito/Nunito-Regular.ttf'),
          'nunito-semibold': require('../assets/fonts/nunito/Nunito-SemiBold.ttf'),
          'nunito-semibolditalic': require('../assets/fonts/nunito/Nunito-SemiBoldItalic.ttf'),
          // Roboto
          'roboto-black': require('../assets/fonts/roboto/Roboto-Black.ttf'),
          'roboto-blackitalic': require('../assets/fonts/roboto/Roboto-BlackItalic.ttf'),
          'roboto-bold': require('../assets/fonts/roboto/Roboto-Bold.ttf'),
          'roboto-bolditalic': require('../assets/fonts/roboto/Roboto-BoldItalic.ttf'),
          'roboto-italic': require('../assets/fonts/roboto/Roboto-Italic.ttf'),
          'roboto-light': require('../assets/fonts/roboto/Roboto-Light.ttf'),
          'roboto-lightitalic': require('../assets/fonts/roboto/Roboto-LightItalic.ttf'),
          'roboto-medium': require('../assets/fonts/roboto/Roboto-Medium.ttf'),
          'roboto-mediumitalic': require('../assets/fonts/roboto/Roboto-MediumItalic.ttf'),
          'roboto-regular': require('../assets/fonts/roboto/Roboto-Regular.ttf'),
          'roboto-thin': require('../assets/fonts/roboto/Roboto-Thin.ttf'),
          'roboto-thinitalic': require('../assets/fonts/roboto/Roboto-ThinItalic.ttf')
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
