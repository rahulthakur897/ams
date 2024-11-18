import {StyleSheet} from 'react-native';
import {ALIGN, COLOR, DIMENSIONS, FONT} from '../../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  listContainer: {
    margin: 10,
  },
  flatListContainer: {
    height: DIMENSIONS.height - 250,
    overflow: 'scroll',
    paddingBottom: 15,
  },
  taskCard: {
    flexDirection: ALIGN.row.flexDirection,
    justifyContent: ALIGN.contentSpaceBetween.justifyContent,
    alignItems: ALIGN.center.justifyContent,
    backgroundColor: COLOR.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: COLOR.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: 10,
    height: 62,
  },
  taskTitle: {
    color: COLOR.black,
    fontSize: 16,
    fontFamily: FONT.Bold,
  },
  taskSubtitle: {
    color: '#888',
  },
  checkInButton: {
    backgroundColor: COLOR.red,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 20,
    alignItems: ALIGN.center.justifyContent,
  },
  checkInButtonDisable: {
    backgroundColor: COLOR.lightBlack,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 20,
    alignItems: ALIGN.center.justifyContent,
  },
  checkInText: {
    color: COLOR.white,
    fontFamily: FONT.Medium,
    fontSize: 16,
  },
  successImg: {
    width: 110,
    height: 110,
  },
  successText: {
    color: COLOR.green,
    fontFamily: FONT.Medium,
    fontSize: 16,
  },
  successAddText: {
    color: COLOR.gray,
    fontFamily: FONT.Regular,
    fontSize: 12,
  },
  popupButton: {
    marginTop: 15,
    width: DIMENSIONS.width - 40,
    paddingVertical: 10,
    backgroundColor: COLOR.red,
    borderRadius: 25,
  },
  popupButtonText: {
    color: COLOR.white,
    fontFamily: FONT.Medium,
    textAlign: ALIGN.center.justifyContent,
    fontSize: 14,
  },
});

export default style;
