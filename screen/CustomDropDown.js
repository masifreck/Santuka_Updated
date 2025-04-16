import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const NewCustomDropdown = ({
  hasBorder,
  labelText,
  dropData,
  isend = false,
  placeholdername,
  searchPlaceholdername,
  value,
  onChange,
  onChangeText = () => {}, // Default to an empty function to prevent undefined error
  editOnPress,
  isEdit = false,
  showSearch = true,
  isMandatory = true,
  dropdownPosition,
  isEditable=false
}) => {
  return (
    <>
      <Text
        style={{
          alignItems: 'flex-start',
          padding: 5,
          marginLeft: '5%',
          color: 'black',
          fontSize: 13,
          fontFamily: 'PoppinsMedium',
        }}>
        {labelText} {isMandatory && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <View
        style={{
          height: 50,
          width: '90%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: 'black',
          borderRadius: 8,
          alignSelf: 'center',
          marginBottom: isend ? 20 : 5,
        }}>
      <Dropdown
  style={[
    styles.dropdown,
    {
      width: '100%',
      borderWidth: hasBorder ? 0.9 : 0,
      borderColor: hasBorder ? 'red' : 'transparent',
      paddingTop: 20,
    },
  ]}
  placeholderStyle={{ fontSize: 15, color: '#6c6f73' }}
  selectedTextStyle={{ fontSize: 15, color: 'black', marginTop: -9 }}
  inputSearchStyle={{
    height: 40,
    fontSize: 15,
    color: '#6c6f73',
  }}
  itemTextStyle={{ color: 'black' }}
  data={dropData}
  search={showSearch}
  maxHeight={'80%'}
  labelField="label"
  valueField="value"
  placeholder={placeholdername}
  searchPlaceholder={searchPlaceholdername}
  value={value}
  onChange={onChange}
  disable={isEditable}
  onChangeText={(text) => {
    if (onChangeText) {
      onChangeText(text); // Call only if provided
    }
  }}
  dropdownPosition={dropdownPosition}
/>

   
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: '#c0c0c0',
    paddingHorizontal: 15,
  },
});

export default NewCustomDropdown;
