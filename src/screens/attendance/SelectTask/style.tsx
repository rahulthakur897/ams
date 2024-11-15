import { StyleSheet } from 'react-native';
import { ALIGN, COLOR, DIMENSIONS, FONT } from '../../../constants';

const style = StyleSheet.create({
  bgImg: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  container: {
    flex: 1,
  },
  chooseSubtask:{
    marginTop: 20,
    color: COLOR.black,
    fontSize: 16,
    paddingBottom:5,
  },allowAccessButton: {
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
  choosetask:{
    marginTop: 20,
    color: COLOR.black,
    fontSize: 16,
    paddingBottom:5,
  },
  addtaskdroptextone:{
    backgroundColor: COLOR.white,
    justifyContent: ALIGN.center.justifyContent,
    borderRadius: 10,
  },
});

export default style;
