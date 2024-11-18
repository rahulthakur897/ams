import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {APP_IMAGE, Screen} from '../../../constants';
import styles from './style';

export default function AddTasks() {
  const navigation = useNavigation();

  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
      <View style={styles.container}>
        <View style={styles.permissionCard}>
          <Text style={styles.cardSubtitle}>
            Add at least 1 task to proceed for check out
          </Text>
          <Pressable style={styles.allowAccessButton}>
            <Text
              onPress={() => navigation.navigate(Screen.SELECTTASK)}
              style={styles.allowAccessText}>
              Add Tasks
            </Text>
          </Pressable>
        </View>
        <View style={styles.checkoutborder}>
          <Pressable style={styles.checkoutbutton}>
            <Text style={styles.checkoutbuttonText}>Check Out</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
