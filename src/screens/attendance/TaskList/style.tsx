import {StyleSheet} from 'react-native';
import {ALIGN, COLOR, DIMENSIONS, FONT} from '../../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  container: {
    flexDirection: ALIGN.row.flexDirection,
    justifyContent: ALIGN.contentSpaceBetween.justifyContent,
  },
  listContainer: {
    padding: 10,
  },
  taskCard: {
    flexDirection: ALIGN.row.flexDirection,
    justifyContent: ALIGN.contentSpaceBetween.justifyContent,
    alignItems: ALIGN.center.justifyContent,
    backgroundColor: COLOR.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: COLOR.white,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: 310,
    height: 50,
  },
  taskTitle: {
    color: COLOR.black,
    fontSize: 16,
    fontFamily: FONT.Bold,
  },
  taskSubtitle: {
    color: '#888',
  },
});

export default style;
