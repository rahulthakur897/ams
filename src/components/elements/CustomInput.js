import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
import {FONT, COLOR} from '../../constants';

export const CustomInput = props => {
  const {
    field: {name, onChange, value},
    form: {errors, touched},
    disabled,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View>
      <View style={{height: 48, marginVertical: 10}}>
        <Input
          inputContainerStyle={styles.textInput}
          value={value}
          ref={props.forwardRef}
          onChangeText={text => onChange(name)(text)}
          {...inputProps}
        />
      </View>
      {hasError ? <Text style={styles.errorText}>{errors[name]}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 14,
    fontFamily: FONT.Regular,
  },
  errorText: {
    fontSize: 12,
    fontFamily: FONT.Italic,
    color: COLOR.red,
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 10,
  },
});
