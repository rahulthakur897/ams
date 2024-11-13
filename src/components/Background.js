import React from 'react';
import {ImageBackground, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {APP_IMAGE} from '../constants';

export function Background({children}) {
  return (
    <ImageBackground source={APP_IMAGE.background} style={styles.background}>
      <KeyboardAvoidingView behavior="padding">{children}</KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
