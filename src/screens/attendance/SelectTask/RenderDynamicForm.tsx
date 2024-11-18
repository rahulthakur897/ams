import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {COLOR, FONT} from '../../../constants';
import {updateFormValues} from '../../../store/actions/attendance';
import {MyDropdown} from '../../../components/MyDropdown';
const _ = require('lodash');

export const RenderDynamicForm = forwardRef((props, ref) => {
  const {dispatch, parentTaskObj, defaultValues, formValues} = props;
  const [val, setVal] = useState('');

  useImperativeHandle(ref, () => ({
    sendFormData,
  }));

  const handleChange = (text, formElemObj) => {
    setVal(prev => ({
      ...prev,
      [formElemObj.ControlHeader]: {
        ...formElemObj,
        inputVal: text,
        parentTaskId: parentTaskObj.value,
      },
    }));
  };

  const sendFormData = () => {
    dispatch(updateFormValues(val));
  };

  const appendDropdownValues = AirtelTaskControlID => {
    const ddList = [];
    defaultValues.forEach(list => {
      if (list.AirtelTaskControlID === AirtelTaskControlID) {
        ddList.push({
          ...list,
          label: list.defaultValues?.toString(),
          value: list.defaultValues,
        });
      }
    });
    return ddList; //_.sortBy(ddList, 'DefaultValues');
  };

  const renderFormFields = () =>
    formValues &&
    formValues.map(formElem => {
      if (formElem.HTMLControlType === 'TextBox') {
        return (
          <View key={formElem.AirtelTaskControlID}>
            <Text style={styles.inputLabel}>{formElem.ControlHeader}</Text>
            <TextInput
              placeholderTextColor="#333"
              style={styles.textinput}
              placeholder={'Enter ' + formElem.ControlHeader}
            />
          </View>
        );
      }
      if (formElem.HTMLControlType === 'DropDown') {
        return (
          <View key={formElem.AirtelTaskControlID}>
            <Text style={styles.inputLabel}>{formElem.ControlHeader}</Text>
            <MyDropdown
              dropdownList={appendDropdownValues(formElem.AirtelTaskControlID)}
              placeholder={formElem.ControlHeader}
            />
          </View>
        );
      }
    });

  return (
    <View>
      {_.size(formValues) ? (
        <View>
          <Text style={styles.addAdditional}>
            -----Add Additional Details------
          </Text>
          <Text style={styles.addAdditionalWarn}>
            * Marked fields are necessary
          </Text>
          <View>
            {/* {renderFormFields()} */}
            {formValues.map(formElem => {
              if (formElem.HTMLControlType === 'TextBox') {
                return (
                  <View key={formElem.AirtelTaskControlID}>
                    <Text style={styles.inputLabel}>
                      {formElem.ControlHeader}
                    </Text>
                    <TextInput
                      id={formElem.ControlHeader}
                      placeholderTextColor="#333"
                      style={styles.textinput}
                      placeholder={'Enter ' + formElem.ControlHeader}
                      // value={val[formElem.ControlHeader]}
                      onChangeText={text => handleChange(text, formElem)}
                    />
                  </View>
                );
              }
              if (formElem.HTMLControlType === 'DropDown') {
                return (
                  <View key={formElem.AirtelTaskControlID}>
                    <Text style={styles.inputLabel}>
                      {formElem.ControlHeader}
                    </Text>
                    <MyDropdown
                      dropdownList={appendDropdownValues(
                        formElem.AirtelTaskControlID,
                      )}
                      placeholder={formElem.ControlHeader}
                    />
                  </View>
                );
              }
            })}
          </View>
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  addAdditional: {
    marginTop: 20,
    color: COLOR.black,
    fontSize: 14,
    fontFamily: FONT.Medium,
    textAlign: 'center',
  },
  addAdditionalWarn: {
    marginTop: 10,
    color: COLOR.red,
    fontSize: 14,
    fontFamily: FONT.Medium,
  },
  inputLabel: {
    color: COLOR.black,
    fontSize: 16,
    paddingBottom: 4,
  },
  textinput: {
    borderWidth: 0.4,
    borderColor: COLOR.lightBlack,
    borderRadius: 8,
    marginBottom: 8,
    height: 48,
    padding: 10,
    color: COLOR.gray,
    backgroundColor: COLOR.white,
  },
});
