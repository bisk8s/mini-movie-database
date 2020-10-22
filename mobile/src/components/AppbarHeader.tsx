import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

type AppbarHeaderComponentProps = {
  title: string;
  goBack?: () => void;
};

export default function AppbarHeaderComponent({ title, goBack }: AppbarHeaderComponentProps) {
  return (
    <Appbar.Header dark style={styles.appBarHeader}>
      {goBack && <Appbar.BackAction onPress={goBack} />}
      <Appbar.Content titleStyle={styles.title} title={title} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  appBarHeader: {
    backgroundColor: 'transparent'
  }
});
