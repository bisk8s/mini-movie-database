import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { RootStackParamList } from '../types';

const deadlinkpng = require('../assets/images/deadlink.png');

export default function NotFoundScreen({ navigation }: StackScreenProps<RootStackParamList, 'NotFound'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops...</Text>
      <Text style={styles.title}>You found a dead link.</Text>
      <Image source={deadlinkpng} width={144} height={96} />
      <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.link}>
        <Text style={styles.linkText}>Let's go to home screen.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  link: {
    marginTop: 15,
    paddingVertical: 15
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
});
