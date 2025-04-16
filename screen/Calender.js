import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React from 'react';
  import DatePicker from 'react-native-date-picker';
  const Calander = ({
    num,
    open,
    date,
    onConfirm,
    onCancel,
    onPress,
    valueDate,
    isEvalidate = true,
    labelname,
    isMandatory = false,
    hasBorder = false,
  }) => {
    const selectedDate = date === '' ? new Date() : date;
    return (
      <>
        <Text style={styles.levelText}>
          {labelname}
          {isMandatory && <Text style={{color: 'red'}}>*</Text>}
        </Text>
      <View style={{backgroundColor:'#c0c0c0',
        borderRadius:10,width:'90%',alignSelf:'center'
      }}>
      
  
        <View
          style={[
            styles.inputContainer,
            {
              borderWidth: hasBorder && isMandatory ? 0.9 : 0,
              borderColor: hasBorder && isMandatory ? 'red' : 'transparent',
            },
          ]}>
          <TextInput
            placeholderTextColor={'#6c6f73'}
            style={[{},styles.input1, {color: '#000000'}]} // Set color to black
            placeholder={'DD-MM-YYYY'}
            autoCorrect={false}
            value={valueDate}
            editable={false}
          />
          <DatePicker
            mode="date"
            modal
            open={open}
            date={selectedDate}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
          <TouchableOpacity onPress={onPress}>
            <Image
              style={{height: 20, width: 20, margin: '15%',marginHorizontal:10}}
              source={require('./assets/calendar.png')}
            />
          </TouchableOpacity>
        </View>
        </View>
      </>
      
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
    },
  
    levelContainer: {
      backgroundColor: 'white',
    
      borderRadius: 15,
    },
  
    MandatoryText: {
      alignItems: 'flex-start',
      padding: 5,
      marginTop: '5%',
      marginLeft: '5%',
      color: 'black',
      fontSize: 10,
      fontFamily: 'PoppinsRegular',
    },
  
    button: {
      backgroundColor: '#2596be',
      borderRadius: 5,
      marginTop: 20,
      marginBottom: 40,
      height: 30,
      //width: '90%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
    },
    inputContainer: {
      width: '100%',
      //backgroundColor: '#D2F3FD',
      flexDirection: 'row',
      //paddingHorizontal: 15,
     // borderRadius: 10,
      alignItems: 'center',
      borderColor: 'black',
      alignSelf: 'center',
      alignItems:'center',
      justifyContent:'center',
      textAlign:'center',marginLeft:'auto',marginRight:'auto',
      paddingHorizontal:10
    },
    levelText: {
      alignItems: 'flex-start',
      padding: 5,
      marginLeft: '5%',
      color: 'black',
      fontSize: 13,
      fontFamily: 'PoppinsMedium',
    },
    dropdown: {
      height: 50,
      width: '90%',
      borderColor: 'black',
      borderRadius: 8,
      paddingHorizontal: 8,
      alignSelf: 'center',
      backgroundColor: '#cedff0',
      paddingHorizontal: 15,
    },
  });
  
  export default Calander;