import {StyleSheet} from 'react-native';
import {COLOR, DIMENSIONS, FONT} from '../../../constants';

const style = StyleSheet.create({
  bgImg: {
    flex: 1,
    height: DIMENSIONS.height,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 50,
  },
  boxContainer: {
    borderRadius: 8,
    width: 135,
    height: 125,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  boxText: {
    fontSize: 16,
    color: COLOR.gray,
    marginTop: 8,
  },
  warnText: {
    fontSize: 16,
    fontFamily: FONT.Medium,
    color: COLOR.red,
    marginTop: 15,
    textAlign: 'center',
    marginHorizontal: 42,
  },
});

export default style;
