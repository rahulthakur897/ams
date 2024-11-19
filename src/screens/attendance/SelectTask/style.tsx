import {StyleSheet} from 'react-native';
import {COLOR, FONT} from '../../../constants';

const style = StyleSheet.create({
  bgImg: {
    flex: 1,
  },
  allowAccessButton: {
    backgroundColor: COLOR.orange,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 10,
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
