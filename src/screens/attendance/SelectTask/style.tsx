import {StyleSheet} from 'react-native';
import {COLOR, DIMENSIONS, FONT} from '../../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  allowAccessButton: {
    backgroundColor: COLOR.orange,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  allowAccessText: {
    color: COLOR.white,
    fontFamily: FONT.Bold,
    textAlign: 'center',
    fontSize: 14,
  },
  chooseSubtask: {
    marginTop: 20,
    color: COLOR.black,
    fontSize: 16,
    paddingBottom: 5,
  },
  choosetask: {
    marginTop: 20,
    color: COLOR.black,
    fontSize: 16,
    paddingBottom: 5,
  },
});

export default style;
