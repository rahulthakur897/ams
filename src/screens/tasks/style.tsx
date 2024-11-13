import { StyleSheet } from 'react-native';
import { DIMENSIONS } from '../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 94,
    lineHeight: 20,
    fontFamily: 'Poppins',
    color: 'black',
  },
  permissionCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 0,
    marginTop: 160,
    marginLeft: 20,
    marginRight: 20,
    padding: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
  },
  checkoutborder: {
    alignItems: 'center',    
    backgroundColor: '#FFF',
    borderRadius: 0,
    width: DIMENSIONS.width,
    height: 100,
    marginTop: 350,
    paddingTop:20,
    marginLeft: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
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
  }, pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#A6A6A6',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
  allowAccessButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    
  },
  allowAccessText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
    
  checkoutbutton: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    width:299,
    height:48,
    fontFamily: 'Poppins',
    fontWeight: '400',
    textAlign: 'center',
  },checkoutbuttonText: {
    color: '#696969',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  //apply attendance styling
  appheader: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: 'black',
    paddingLeft: 10,
  }, empdetails: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 0,
    fontFamily: 'Poppins',
    color: 'black',
  }  
  , addtaskText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 0,
    fontFamily: 'Poppins',
    color: 'black',
  },
  addtaskdroptextone:{
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 0,
    padding:20,
    fontFamily: 'Poppins',
    color: 'black',
  },
  //Button Navigation
  bottomNavigation: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },iconss:{
    flexDirection: 'row'
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#fff',
    marginBottom: 20,
  },
});

export default style;
