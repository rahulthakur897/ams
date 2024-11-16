import { StyleSheet } from 'react-native';
import { ALIGN, COLOR, DIMENSIONS, FONT } from '../../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  container: {
    flex: 1,
  },
  chooseSubtask:{
    marginTop: 20,
    color: COLOR.black,
    fontSize: 16,
    paddingBottom:5,
  },
  choosetask:{
    marginTop: 20,
    color: COLOR.black,
    fontSize: 16,
    paddingBottom:5,
  },
  addtaskdroptextone:{
    backgroundColor: COLOR.white,
    justifyContent: ALIGN.center.justifyContent,
    borderRadius: 10,
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
});

export default style;
