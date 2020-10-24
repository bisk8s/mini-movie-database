import React from 'react';
import { View, TextInput as DefaultTextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import styled from 'styled-components/native';
import { rspHeight, rspWidth } from '../utils/Responsive';

export type TextInputProps = DefaultTextInput['props'];
export function TextInput(props: TextInputProps) {
  return (
    <TextInputWrapper>
      <TextInputInner placeholderTextColor={Colors.text} {...props} />
    </TextInputWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 7
  }
});

const TextInputWrapper = styled(View)`
  ${styles.wrapper}
`;
const TextInputInner = styled(DefaultTextInput)`
  ${{
    height: rspHeight(130),
    paddingHorizontal: rspWidth(50),
    textTransform: 'none',
    fontFamily: 'nunito-light',
    fontSize: rspHeight(38),
    color: Colors.text
  }}
`;
