import {StyleSheet, Platform} from 'react-native';
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
    marginLeft: Platform.isPad ? DIMENSIONS.width / 3 : 50,
  },
  title: {
    marginTop: 70,
    marginBottom: 15,
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
  errorMsg: {
    color: COLOR.red,
    fontFamily: FONT.MediumItalic,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  versionText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    fontFamily: FONT.Medium,
    marginLeft: DIMENSIONS.width/2.5,
    color: COLOR.black,
    textAlign: 'center',
  },
});

export default style;
