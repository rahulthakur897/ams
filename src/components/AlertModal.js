import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {COLOR, DIMENSIONS, FONT} from '../constants';
import { CustomButton } from './elements';

export const AlertModal = forwardRef((props, ref) => {
  const {heading, content, closeModal, btn1Title, btn1onPress, btn2Title, btn2onPress} =
    props;
  const [showModal, toggleModal] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleModal() {
      toggleModal(prevVal => !prevVal);
    },
  }));

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        toggleModal(false);
      }}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Pressable style={styles.closeBtn} onPress={() => closeModal()}>
            <FeatherIcon name="x" size={20} color={'#667085'} />
          </Pressable>
          <View>
            <Text style={styles.heading}>{heading}</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: 300,
              }}>
              <Text style={styles.para}>{content}</Text>
            </View>
            {btn1Title && (
              <CustomButton title={btn1Title} onPress={() => btn1onPress()} />
            )}
            {btn2Title ? <Text /> : null}
            {btn2Title && (
              <CustomButton
                title={btn2Title}
                outline={true}
                onPress={() => btn2onPress()}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  closeBtn: {
    position: 'absolute',
    top: 8,
    right: 10,
  },
  modal: {
    borderWidth: 1,
    borderColor: COLOR.blue,
    backgroundColor: COLOR.white,
    borderRadius: 12,
    width: DIMENSIONS.width - 40,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontFamily: FONT.Medium,
    color: COLOR.blue,
  },
  title: {
    fontSize: 16,
    fontFamily: FONT.Regular,
    color: COLOR.black,
    marginVertical: 15,
  },
  para: {
    fontSize: 14,
    fontFamily: FONT.Regular,
    color: COLOR.gray,
    marginVertical: 15,
  },
});
