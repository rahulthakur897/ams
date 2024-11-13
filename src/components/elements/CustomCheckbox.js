import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {CheckBox} from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {FONT, COLOR} from '../../constants';

export const CustomCheckbox = (props) => {
  const {title, checked, onPress} = props;

  return (
    <CheckBox
      title={title}
      textStyle={styles.textStyle}
      Component={TouchableWithoutFeedback}
      checkedIcon={
        <FeatherIcon size={18} name={'check-square'} color={COLOR.green} />
      }
      uncheckedIcon={
        <FeatherIcon size={18} name={'square'} color={COLOR.red} />
      }
      checked={checked}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: COLOR.black,
    fontFamily: FONT.Regular,
    fontSize: 14,
  },
});
