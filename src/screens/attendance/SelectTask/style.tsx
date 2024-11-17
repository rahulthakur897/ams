import { StyleSheet } from 'react-native';
import { ALIGN, COLOR, DIMENSIONS, FONT } from '../../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  chooseSubtask:{
    marginTop: 20,
    color: COLOR.black,
    fontSize: 16,
    paddingBottom:5,
  },allowAccessButton: {
    backgroundColor: COLOR.orange,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  allowAccessText: {
    color: COLOR.white,
    fontFamily: FONT.Bold,
    fontSize: 14,
  },
  choosetask:{
    marginTop: 20,
    color: COLOR.black,
    fontSize: 16,
    paddingBottom:5,
  },
  addAdditional: {
    marginTop: 20,
    color: COLOR.black,
    fontSize: 14,
    fontFamily: FONT.Medium,
    textAlign: 'center',
  },
  addAdditionalWarn: {
    marginTop: 10,
    color: COLOR.red,
    fontSize: 14,
    fontFamily: FONT.Medium,
  },
  inputLabel: {
    color: COLOR.black,
    fontSize: 16,
    paddingBottom: 4,
  },
  textinput: {
    borderWidth: 0.4,
    borderColor: COLOR.lightBlack,
    borderRadius: 8,
    marginBottom: 8,
    height: 48,
    padding: 10,
    color: COLOR.gray,
    backgroundColor: COLOR.white,
  },
});

export default style;
