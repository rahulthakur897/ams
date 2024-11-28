import {StyleSheet} from 'react-native';
import {COLOR, DIMENSIONS, FONT} from '../../../constants';

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
  uploadContainer: {
    borderWidth: 1,
    borderColor: COLOR.gray,
    borderRadius: 8,
    width: DIMENSIONS.width - 40,
    marginBottom: 10,
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedImg: {
    width: DIMENSIONS.width - 40,
    height: 150,
    borderRadius: 8,
    flex: 1,
    resizeMode: 'stretch',
  },
  mandatoryField: {
    color: COLOR.red,
    fontSize: 12,
    fontFamily: FONT.MediumItalic,
  },
  trashContainer: {
    backgroundColor: COLOR.hexgray,
    borderRadius: 50,
    width: 30,
    height: 30,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 10,
    color: COLOR.hexgray,
    fontFamily: FONT.MediumItalic,
  },
});

export default style;
