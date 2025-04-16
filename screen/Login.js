import React, {  useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      if (!username) {
        Alert.alert('Failed', 'Please provide username');
        return;
      }
      if (!password) {
        Alert.alert('Failed', 'Please provide password');
        return;
      }
  
      setLoading(true); // Start loading
  
      const response = await fetch("http://mis.santukatransport.in/API/Test/APILogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          username: username,   
          Password: password,   
        }),
      });
      
      
      
  console.log(response)
      setLoading(false); // Stop loading
  
      if (response.status === 200) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        Alert.alert('Success', 'Login successful');
        navigation.navigate('Dashboard', {username, password});
      } else {
        console.log('Login failed: Invalid username or password');
        setErrorMessage(`Invalid username or password Server Status ${response.status}`);
      }
    } catch (error) {
      console.log('An error occurred during login:', error);
      setErrorMessage(`An error occurred. Please try again.${error}`);
    } finally {
      setLoading(false); // Stop loading in case of error
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.header, styles.welcome]}>
        <Image source={require('./assets/santuka.png')} style={styles.image} />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {/* Username Input */}
          <Image source={require('./assets/user.png')} style={styles.icon} />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          {/* Password Input */}
          <Image source={require('./assets/password.png')} style={styles.icon} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={!showPassword}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />
          {/* Password Visibility Toggle */}
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                showPassword
                  ? require('./assets/eye.png')
                  : require('./assets/close-eye.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signIn}
          onPress={handleLogin}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.textSign}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <Text style={styles.poweredBy}>Powered By Tranzol</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    top: 100,
  },
  image: {
    width: 70,
    height: 70,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 200,
  },
  formContainer: {
    width: '80%',
  },
  poweredBy: {
    color: '#2E5090',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 230,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    borderWidth: 0.5,
    width: 20,
    height: 20,
    marginRight: -23,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: -30,
  },
  textInput: {
    flex: 1,
    borderRadius: 5,
    color: '#2E5090',
    borderWidth: 0.5,
    borderColor: 'black',
    paddingLeft: 30,
    paddingRight: 20,
  },
  signIn: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#2E5090',
    marginTop: 20,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;
