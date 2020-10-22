import React from 'react';
import { View, TextInput as DefaultTextInput } from 'react-native';

import { rspHeight, rspWidth } from '../utils/Responsive';

export type TextInputProps = DefaultTextInput['props'];
export function TextInput(props: TextInputProps) {
  const { style, placeholderTextColor, ...otherProps } = props;
  return (
    <View
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
    </View>
  );
}
