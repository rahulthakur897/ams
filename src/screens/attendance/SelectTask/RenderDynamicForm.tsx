import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {COLOR, FONT} from '../../../constants';
import {updateFormValues} from '../../../store/actions/attendance';
import {MyDropdown} from '../../../components/MyDropdown';
const _ = require('lodash');

type Dropdown = {
  label: string;
  value: number;
}

export const RenderDynamicForm = forwardRef((props, ref) => {
  const {dispatch, parentTaskObj, defaultValues, formValues} = props;
  const [val, setVal] = useState('');

  useImperativeHandle(ref, () => ({
    sendFormData,
  }));

  const handleChange = (text: string, formElemObj: any) => {
    setVal((prev: any) => ({
      ...prev,
      [formElemObj.ControlHeader]: {
        ...formElemObj,
        inputVal: text,
        parentTaskId: parentTaskObj.value,
      },
    }));
  };

  const handleDropdown = (item: any, placeholder: string) => {
    setVal((prev: any) => ({
      ...prev,
      [placeholder]: {
        ...item,
        inputVal: item.value,
        parentTaskId: parentTaskObj.value,
      },
    }));
  };

  const sendFormData = () => {
    dispatch(updateFormValues(val));
  };

  const appendDropdownValues = (AirtelTaskControlID: string) => {
    const ddList: Dropdown[] = [];
    defaultValues.forEach((list: any) => {
      if (list.AirtelTaskControlID === AirtelTaskControlID) {
        ddList.push({
          ...list,
          label: list.DefaultValues?.toString(),
          value: list.AirtelTaskDefaultValueID,
        });
      }
    });
    return _.orderBy(ddList, ['value']);
  };

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
            {formValues.map((formElem: any) => {
              if (formElem.HTMLControlType === 'TextBox') {
                return (
                  <View key={formElem.AirtelTaskControlID}>
                    <Text style={styles.inputLabel}>
                      {formElem.ControlHeader} {formElem.IsRequired ? <Text style={styles.mandatoryField}>*</Text> : null}
                    </Text>
                    <TextInput
                      id={formElem.ControlHeader}
                      placeholderTextColor="#333"
                      style={styles.textinput}
                      returnKeyType="next"
                      placeholder={'Enter ' + formElem.ControlHeader}
                      onChangeText={text => handleChange(text, formElem)}
                    />
                  </View>
                );
              }
              if (formElem.HTMLControlType === 'DropDown') {
                return (
                  <View key={formElem.AirtelTaskControlID} style={{marginBottom: 15}}>
                    <Text style={[styles.inputLabel, {paddingBottom: 0, marginBottom: -15}]}>
                      {formElem.ControlHeader}
                    </Text>
                    <MyDropdown
                      dropdownList={appendDropdownValues(
                        formElem.AirtelTaskControlID,
                      )}
                      selectedItem={val[formElem.ControlHeader]}
                      placeholder={formElem.ControlHeader}
                      callback={handleDropdown}
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
  mandatoryField: {
    color: COLOR.red,
  },
});
