import {StyleSheet} from 'react-native';
import {COLOR, FONT, DIMENSIONS} from '../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  logo: {
    width: 234,
    height: 55,
    marginTop: 70,
    marginLeft: 50,
  },
  title: {
    marginTop: 70,
    fontSize: 36,
    fontFamily: FONT.Bold,
    color: COLOR.black,
  },
  subTitle: {
    marginTop: -15,
    fontSize: 22,
    fontFamily: FONT.Medium,
    color: COLOR.gray,
  },
  captchabackground: {
    backgroundColor: '#fafaf6',
    height: 76,
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
  },
  captchaImg: {
    width: 50,
    height: 50,
  },
  forgetText: {
    color: COLOR.black,
    fontFamily: FONT.Regular,
    fontSize: 14,
  },
  labtext: {
    color: COLOR.black,
    fontFamily: FONT.Regular,
    fontSize: 14,
    marginLeft: 130,
    marginTop: 40,
  },
});

export default style;
