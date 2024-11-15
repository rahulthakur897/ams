import { StyleSheet } from 'react-native';
import { ALIGN, COLOR, DIMENSIONS } from '../../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  logoContainer: {
    display: 'flex',
    alignItems: ALIGN.center.justifyContent,
    justifyContent: ALIGN.center.justifyContent,
    flex: 1,
  },
  logo: {
    width: 234,
    height: 55,
  },
  container: {
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderColor: COLOR.gray,
    color: COLOR.black,
    borderWidth: 0,  // Removes the border
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    color: COLOR.gray,  // Placeholder text color
  },
  selectedTextStyle: {
    color: COLOR.gray,  // Selected item text color
    fontSize: 16,
  },
  itemTextStyle: {
    color: COLOR.black,  // Dropdown list item text color
    fontSize: 16,
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
    backgroundColor: COLOR.white, // Button color     
    justifyContent: ALIGN.center.justifyContent,
    borderRadius: 10,
  } 
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor:COLOR.gray,
    borderRadius: 4,
    color: COLOR.black,
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: COLOR.white,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLOR.gray,
    borderRadius: 4,
    color: COLOR.black,
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: COLOR.white,
    marginBottom: 20,
  },
});

export default style;
