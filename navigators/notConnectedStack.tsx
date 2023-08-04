import React, { FunctionComponent } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Login from '../screens/login';
import EmailVerification from '../screens/emailVerification';

const Stack = createNativeStackNavigator();

const NotConnectedStack: FunctionComponent = () => {

  return (
    <NavigationContainer
      theme={DarkTheme}
    >
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='Welcome'
      >
        <Stack.Screen 
          name="Login"
          component={Login}
        />
        <Stack.Screen 
          name="EmailVerification"
          component={EmailVerification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NotConnectedStack;