import {StyleSheet} from 'react-native';
import {DIMENSIONS, FONT, COLOR} from '../../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  container: {
    flex: 1,
  },
  permissionCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 0,
    marginTop: 160,
    marginLeft: 20,
    marginRight: 20,
    padding: 30,
    marginBottom: 20,
    shadowColor: COLOR.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 3,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLOR.gray,
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: FONT.Regular,
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
    fontSize: 14,
  },
});

export default style;
