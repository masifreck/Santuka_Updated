import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = ({ navigation }) => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
  
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
  
        setTimeout(async () => {
          if (isLoggedIn === 'true') {
            navigation.navigate('Dashboard', {
              username: await AsyncStorage.getItem('username'),
              password: await AsyncStorage.getItem('password'),
            });
          } else {
            navigation.navigate('Login')
          }
        }, 3000); // 3-second delay in both cases
  
      } catch (error) {
        console.log('Error initializing app:', error);
      }
    };
  
    initializeApp();
  }, []);
  

  return (
    <View style={styles.container}>
      <Image source={require('./assets/santuka.png')} style={styles.image} />
      <Text style={styles.text}>Santuka</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 10, // Adjust the margin to your preference
    fontSize: 25, // Adjust the font size to your preference
    color: 'black',
    fontWeight: 'bold',
  },
});

export default App;
