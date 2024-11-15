import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {Storage} from '../utils';
import {BASEURL, COLOR} from '../constants';
import {getBillerList} from '../store/actions/user';

export function BillerDropdown() {
  const dispatch = useDispatch();
  const {billerList, selectedBiller} = useSelector(state => state.userReducer);

  const getBiller = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Employee/Employees?OrganizationID=${userData.OrganizationID}&EmployeeID=${userData.EmployeeID}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(getBillerList(config));
  };

  useEffect(() => {
    //getBiller();
  }, []);

  return (
    <View style={styles.dropdowncontainer}>
      <Dropdown
        style={styles.dropdown}
        data={billerList}
        labelField="DealerName"
        valueField="DealerID"
        placeholder="Choose Dealer"
        value={selectedBiller.DealerID}
        onChange={item => console.log('itemmmm', item)}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdowncontainer: {
    backgroundColor: COLOR.white, // Button color
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  dropdown: {
    height: 40,
    borderColor: COLOR.gray,
    color: COLOR.black,
    borderWidth: 0, // Removes the border
    borderRadius: 8,
    paddingHorizontal: 8,
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
});
