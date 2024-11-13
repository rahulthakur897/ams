import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {FONT, COLOR} from '../../constants';

export const CustomButton = (props) => {
  const {title, disabled, onPress} = props;

  return (
    <Button
      title={title}
      disabled={disabled}
      titleStyle={styles.titleStyle}
      buttonStyle={[styles.buttonStyle]}
      type={'solid'}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 48,
    backgroundColor: COLOR.red,
    borderRadius: 65,
  },
  titleStyle: {
    fontSize: 16,
    fontFamily: FONT.Medium,
    color: COLOR.white,
  },
});
