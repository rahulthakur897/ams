import { StyleSheet } from 'react-native';
import { DIMENSIONS } from '../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  }, container: {
    flex: 1,
  }, appheader: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: 'black',
    paddingLeft: 10,
    marginTop: 140,
    marginLeft: 135,
  }, allowAccessButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  }, allowAccessText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  }, checkinbuttonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkInButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    alignItems: 'center',
  }, checkinbutton: {
    backgroundColor: '#ec4218', // Button color
    paddingVertical: 12,
    marginTop: 140,
    textAlign: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },
  permissionCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 30,
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
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
    padding: 10,
  }, heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: 'black',
  }
});

export default style;
