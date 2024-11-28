import {StyleSheet} from 'react-native';
import {DIMENSIONS, COLOR, FONT, ALIGN} from '../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  cameraContainer: {
    position: 'relative',
    borderRadius: 10,
    marginTop: 20,
    height: 300,
    shadowColor: COLOR.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 2,
    elevation: 3,
  },
  permissionCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 10,
    height: 300,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: COLOR.black,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
    padding: 10,
  },
  allowAccessButton: {
    backgroundColor: COLOR.red,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  allowAccessText: {
    color: COLOR.white,
    fontFamily: FONT.Bold,
    fontSize: 14,
  },
  iconss: {
    flexDirection: 'row',
  },
  checkInButton: {
    backgroundColor: COLOR.red,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: ALIGN.center.justifyContent,
    marginTop: 20,
  },
  checkInButtonDisable: {
    backgroundColor: COLOR.lightBlack,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: ALIGN.center.justifyContent,
    marginTop: 50,
  },
  checkInText: {
    color: COLOR.white,
    fontFamily: FONT.Medium,
    fontSize: 16,
  },
  empdetails: {
    fontSize: 16,
    marginLeft: 0,
    fontFamily: FONT.Regular,
    color: COLOR.black,
    marginTop: 5,
  },
  checkinbutton: {
    backgroundColor: '#ec4218', // Button color
    width: 320,
    height: 40,
    textAlign: ALIGN.center.justifyContent,
    borderRadius: 25,
    alignItems: ALIGN.center.justifyContent,
    marginTop: 40,
  },
  checkinbuttonText: {
    color: COLOR.white,
    fontSize: 16,
    paddingTop: 8,
  },
  successImg: {
    width: 110,
    height: 110,
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR.hexgray,
    marginTop: 10,
    color: COLOR.black,
    paddingHorizontal: 10,
    fontSize: 16,
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
