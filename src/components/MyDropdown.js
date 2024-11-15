import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLOR} from '../constants';
const _ = require('lodash');

export const MyDropdown = React.memo(({dropdownList, selectedItem, callback}) => {
  
  const updateSelection = (item) => {
    callback(item);
  };

  return (
    <View style={styles.dropdowncontainer}>
      <Dropdown
        style={styles.dropdown}
        data={dropdownList}
        labelField="label"
        valueField="value"
        placeholder="Choose Dealer"
        value={selectedItem.value}
        onChange={item => updateSelection(item)}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
      />
    </View>
  );
});

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
