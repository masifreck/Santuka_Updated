import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  Button,
  Alert, PermissionsAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Camera,
  useCameraPermission,
  useCodeScanner,
  useCameraDevice,
} from 'react-native-vision-camera';

import RNRestart from 'react-native-restart';
const wW = Dimensions.get('screen').width;
const wH = Dimensions.get('screen').height;
const isFine = wW < 400;

const ScannerTP = ({route}) => {
  const navigation = useNavigation();
  const [cameraActive, setCameraActive] = useState(true);
  const [ScannedData, setScannedData] = useState('')
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();


  const showAlert = () => {
    Alert.alert(
      'Info',
      'Restart App after Permissions',
      [
        {
          text: 'OK',
          onPress: () => checkAndRequestCameraPermission(),
        },
      ],
      {cancelable: false},
    );
  };
  async function checkAndRequestCameraPermission() {
    console.log('restart kindly===========================================');
    console.log(
      PermissionsAndroid.RESULTS.GRANTED,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    try {
      // Check if the permission is already granted
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (granted) {
        console.log('Camera permission already granted');
        return PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // If permission is not granted, request it
        const requestResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'Note : After Accepting, It restarts',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (requestResult === PermissionsAndroid.RESULTS.GRANTED) {
          RNRestart.restart();
          console.log('Camera permission granted');
          console.log(
            'restart kindly===========================================',
          );
          console.log(
            PermissionsAndroid.RESULTS.GRANTED,
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
        } else {
          console.log('Camera permission denied');
          // Optionally, you can show an alert to inform the user
          Alert.alert(
            'Permission Denied',
            'You denied camera access. This app requires camera access to function properly.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }

        return requestResult;
      }
    } catch (error) {
      console.error(`Error checking/requesting camera permission: ${error}`);
      return PermissionsAndroid.RESULTS.DENIED;
    }
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'ean-8', 'code-128', 'code-39', 'upc-a', 'upc-e'],
    onCodeScanned: codes => {
      const scannedValue = codes[0].value;
      console.log('QR CODE:', scannedValue);
      setCameraActive(false);
      setScannedData(scannedValue);
      navigation.navigate('Data', {scannedTP:scannedValue});
    },
  });
  
  const NoCameraErrorView = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: '#276A76',
          textAlign: 'center',
          fontSize: 15,

          textTransform: 'uppercase',
          fontFamily: 'PoppinsBold',
          marginTop: 5,
          letterSpacing: 1,
        }}>
        Allow Camera Permission
      </Text>
      <TouchableOpacity style={{}} onPress={showAlert}>
        <Text style={{color:'black'}}>Allow</Text>
      </TouchableOpacity>
    </View>
  );
  if (!hasPermission) {
    // Handle permission denied case
    console.log('Permission denied');
    return <NoCameraErrorView />;
  }

  if (device === null) {
    // Handle no camera device found case
    console.log('No camera device found');
    return <NoCameraErrorView />;
  }

  return ( 
    <KeyboardAvoidingView
    style={{flex: 1, backgroundColor: 'white'}}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={keyboardHeight}>
  <Camera
              style={[StyleSheet.absoluteFill,{flex:1,width:wW,
                height:wH,zIndex:10
              }]}
              device={device}
              isActive={cameraActive}
              codeScanner={codeScanner}
            /> 
      </KeyboardAvoidingView>

  );
};



export default ScannerTP;