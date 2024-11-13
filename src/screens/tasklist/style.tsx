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
    padding: 20,    
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
    borderRadius: 10,
    marginTop: 30,
    padding: 30,
    marginBottom: 20,
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
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  allowAccessButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingLeft:18,
    borderRadius: 30,
    marginLeft:100,
    
  },
  allowAccessText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkInButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    alignItems: 'center',
  },
  checkInText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 16,
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
  //apply attendance styling
  appheader: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center', 
    fontFamily: 'Poppins',
    color: 'black',
    paddingLeft:10,
  },empdetails: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 0, 
    fontFamily: 'Poppins',
    color: 'black',
  },checkinbutton: {
    backgroundColor: '#ec4218', // Button color
    paddingTop: 8,
    marginTop: 140,
    borderRadius: 5,
    width: 320,
    height: 40,
    textAlign: 'center',
    borderEndEndRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomStartRadius: 25,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
  },checkinbuttonText: {
    color: '#fff',
    fontSize: 16,
  }





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
