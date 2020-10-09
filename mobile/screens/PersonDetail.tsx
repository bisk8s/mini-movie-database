import React from 'react';
import { StyleSheet, View as DefaultView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Chip } from 'react-native-paper';

import { View } from '../components/Themed';
import RoundedContainer from '../components/RoundedContainer';
import AppbarHeader from '../components/AppbarHeader';
import { rspHeight, rspWidth } from '../utils/Responsive';

import { PersonTabParamList } from '../types';
import OptionButton from '../components/OptionButton';

type ScreenProps = {
  navigation: StackNavigationProp<PersonTabParamList>;
};
export default function PersonDetailScreen({ navigation }: ScreenProps) {
  return (
    <View style={styles.container}>
      <AppbarHeader title={'People'} goBack={navigation.goBack} />
      <RoundedContainer>
        <ScrollView centerContent horizontal>
          <DefaultView style={styles.topButtons}>
            <Chip style={{ marginRight: rspWidth(24) }}>Test</Chip>
          </DefaultView>
        </ScrollView>
        <DefaultView style={styles.buttonsWrapper}>
          <OptionButton
            color="#368791"
            icon="headset"
            text="Pré Atendimento"
            onPress={() => console.log('Pré Atendimento')}
          />

          <OptionButton
            color="#FE8E5F"
            icon="account-supervisor"
            text="Visita"
            onPress={() => console.log('Visita')}
          />

          <OptionButton
            color="#CADB46"
            icon="file-document"
            text="Proposta"
            onPress={() => console.log('Proposta')}
          />

          <OptionButton
            color="#29BBAC"
            icon="thumb-up"
            text="Aprovação"
            onPress={() => console.log('Aprovação')}
            /* prettier-break */
          />

          <OptionButton
            color="#E9679D"
            icon="text-subject"
            text="Contrato"
            onPress={() => console.log('Contrato')}
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
    justifyContent: 'flex-start',
    paddingTop: rspHeight(24)
  },

  topButtons: {
    flexDirection: 'row',
    marginBottom: rspHeight(24),
    justifyContent: 'space-between'
  }
});
