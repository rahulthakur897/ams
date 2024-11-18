import {StyleSheet} from 'react-native';
import { COLOR } from '../../constants';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f4f4f4',
  },
  legend: {
    width: 15,
    height: 15,
    borderRadius: 10,
  },
  legendText: {
    color: COLOR.black,
    marginLeft: -30,
  },
});

export default style;
