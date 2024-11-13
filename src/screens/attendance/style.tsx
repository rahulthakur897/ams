import {StyleSheet} from 'react-native';
import {DIMENSIONS, COLOR, FONT} from '../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  permissionCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 10,
    marginTop: 30,
    height: 300,
    shadowColor: COLOR.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: 'black',
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
  checkInButton: {
    backgroundColor: COLOR.red,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 50,
  },
  checkInText: {
    color: COLOR.white,
    fontFamily: FONT.Medium,
    fontSize: 16,
  },
  iconss: {
    flexDirection: 'row',
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
    textAlign: 'center',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 40,
  },
  checkinbuttonText: {
    color: COLOR.white,
    fontSize: 16,
    paddingTop: 8,
  },
  dropdown: {
    height: 40,
    borderColor: COLOR.gray,
    color: COLOR.black,
    borderWidth: 0, // Removes the border
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdowncontainer: {
    backgroundColor: COLOR.white, // Button color
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  placeholderStyle: {
    color: COLOR.black, // Placeholder text color
  },
  selectedTextStyle: {
    color: COLOR.black, // Selected item text color
    fontSize: 16,
  },
  itemTextStyle: {
    color: COLOR.black, // Dropdown list item text color
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
    textAlign: 'center',
    fontSize: 14,
  },
});

export default style;
