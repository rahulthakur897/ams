import { StyleSheet } from 'react-native';
import { ALIGN, DIMENSIONS, FONT } from '../../../constants';
import { COLOR } from '../../../constants';

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
  header: {
    fontSize: 20, 
    textAlign: ALIGN.center.justifyContent,
    marginTop: 94,
    lineHeight: 20,
    fontFamily: FONT.Regular,
    color: COLOR.black,
  },
  permissionCard: {
    alignItems: ALIGN.center.justifyContent,
    justifyContent: ALIGN.center.justifyContent,
    backgroundColor: COLOR.white,
    borderRadius: 0,
    marginTop: 160,
    marginLeft: 20,
    marginRight: 20,
    padding: 30,
    marginBottom: 20,
    shadowColor: COLOR.black,
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
  },
  checkoutborder: {
    alignItems: ALIGN.center.justifyContent,    
    backgroundColor: COLOR.white,
    borderRadius: 0,
    width: DIMENSIONS.width,
    height: 100,
    marginTop: 350,
    paddingTop:20,
    marginLeft: 0,
    shadowColor: COLOR.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16, 
    marginTop: 20,
    textAlign: ALIGN.center.justifyContent,
    fontFamily: FONT.Regular,
    color: COLOR.black,
  }, pickerContainer: {
    borderWidth: 1,
    borderColor: COLOR.hexgray,
    borderRadius: 4,
    marginBottom: 20,
    backgroundColor: COLOR.white,
  },
  picker: {
    height: 50,
    width: '100%',
    color: COLOR.darkcharcoal,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLOR.gray,
    marginTop: 10,
    textAlign: ALIGN.center.justifyContent,
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
    
  checkoutbutton: {
    backgroundColor: COLOR.gray,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    width:299,
    height:48,
    fontFamily: FONT.Regular, 
    textAlign: ALIGN.center.justifyContent,
  },checkoutbuttonText: {
    color:  COLOR.gray, 
    fontFamily: FONT.Bold,
    fontSize: 14,
    textAlign: ALIGN.center.justifyContent,
  },
  //apply attendance styling
  appheader: {
    fontSize: 20, 
    textAlign: ALIGN.center.justifyContent,
    fontFamily: FONT.Regular,
    color: COLOR.black,
    paddingLeft: 10,
  }, empdetails: {
    fontSize: 16, 
    marginLeft: 0,
    fontFamily: FONT.Regular,
    color: COLOR.black,
  }  
  , addtaskText: {
    fontSize: 16, 
    marginLeft: 0,
    fontFamily: FONT.Regular,
    color: COLOR.black,
  },
  addtaskdroptextone:{
    fontSize: 16, 
    marginLeft: 0,
    padding:20,
    fontFamily: FONT.Regular,
    color: COLOR.black,
  },
  //Button Navigation
  bottomNavigation: {
    marginTop: 50,
    flexDirection: ALIGN.row.flexDirection,
    justifyContent: ALIGN.contentSpaceAround.justifyContent,
    borderTopWidth: 1,
    borderTopColor: COLOR.gray,
    paddingTop: 10,
  },
  navItem: {
    alignItems: ALIGN.center.justifyContent,
  },
  navText: {
    fontSize: 12,
    color: COLOR.sadeofgray,
    marginTop: 4,
  },iconss:{
    flexDirection: ALIGN.row.flexDirection,
  },
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
    backgroundColor:  COLOR.white,
    marginBottom: 20,
  },
});

export default style;
