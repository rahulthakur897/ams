import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLOR} from '../constants';
const _ = require('lodash');

export const MyDropdown = React.memo(({dropdownList, selectedItem, placeholder, disable, callback}) => {
  
  const updateSelection = (item) => {
    callback(item, placeholder);
  };

  return (
    <View style={styles.dropdowncontainer}>
      <Dropdown
        style={[styles.dropdown, {backgroundColor: disable ? COLOR.hexgray : COLOR.white}]}
        data={dropdownList}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedItem?.value}
        disable={disable ? true : false}
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
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  dropdown: {
    height: 48,
    borderColor: COLOR.lightBlack,
    backgroundColor: COLOR.white,
    color: COLOR.black,
    borderWidth: 0.2,
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
