import { StyleSheet } from 'react-native';
import { ALIGN, COLOR, DIMENSIONS, FONT } from '../../../constants';

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
  headerContainer: {
    flexDirection: ALIGN.row.flexDirection,
    alignItems: ALIGN.center.justifyContent,
    justifyContent: ALIGN.contentSpaceBetween.justifyContent,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: FONT.Bold,
    color: COLOR.black,
  },
  addButton: {
    backgroundColor: COLOR.orange, // Replace with your preferred color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    color: COLOR.black,
  },
  addButtonText: {
    color: COLOR.black,
    fontFamily: FONT.Bold,
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
    width:310,
    height:50,
  },
  taskTitle: {
    color: COLOR.black,
    fontSize: 16,
    fontFamily: FONT.Bold,
  },
  taskSubtitle: {
    color: '#888',
  },

  addtaskdroptextone: {
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
    borderColor: COLOR.gray,
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
