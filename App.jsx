import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import LoginScreen from './screen/Login';
import DashboardScreen from './screen/Dashboard';
import DataScreen from './screen/Data';
import OfflineReportScreen from './screen/OfflineReport';
import ReconciliationScreen from './screen/Reconciliation';
import SettingsScreen from './screen/Settings';
import ScannerTPScreen from './screen/ScannerTP';
import ScannerChallanScreen from './screen/ScannerChallan';
import ScanScreen from './screen/Scan';
import UpiScannerScreen from './screen/UpiScanner';
import ScannerLRScreen from './screen/ScannerLR';
import LrPhotoScreen from './screen/LrPhoto';
import SplashScreen from './screen/Splash';
import NewReport from './screen/NewReport';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerLeft: () => null, gestureEnabled: false }} />
        <Stack.Screen name="Data" component={DataScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="OfflineReport" component={OfflineReportScreen} options={{ headerTitle: "OfflineReport" }} />
        <Stack.Screen name="Reconciliation" component={ReconciliationScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="ScannerTP" component={ScannerTPScreen} />
        <Stack.Screen name="ScannerChallan" component={ScannerChallanScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="UpiScanner" component={UpiScannerScreen} />
        <Stack.Screen name="ScannerLR" component={ScannerLRScreen} />
        <Stack.Screen name="LrPhoto" component={LrPhotoScreen} />
        <Stack.Screen name="REPORT" component={NewReport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
