import React, { useEffect, useState } from 'react';
import { StyleSheet, View as DefaultView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { View } from '../components/Themed';
import RoundedContainer from '../components/RoundedContainer';
import AppbarHeader from '../components/AppbarHeader';
import { rspHeight } from '../utils/Responsive';

import { MovieTabParamList } from '../types';
import OptionButton from '../components/OptionButton';

type ScreenProps = {
  navigation: StackNavigationProp<MovieTabParamList>;
};
export default function MovieDetailScreen({ navigation }: ScreenProps) {
  const [authAreaHidden, setAuthAreaHidden] = useState(true);
  return (
    <View style={styles.container}>
      <AppbarHeader title={'Movies'} goBack={navigation.goBack} />
      <RoundedContainer>
        <DefaultView style={styles.buttonsWrapper}>
          <OptionButton
            color="#E9679D"
            icon="file-document-box-outline"
            text="Edit"
            onPress={() => {}}
          />

          <OptionButton
            color="#E9679D"
            icon="file-document-box-remove-outline"
            text="remove"
            onPress={() => {}}
          />
        </DefaultView>
      </RoundedContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  buttonsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: rspHeight(24)
  }
});
