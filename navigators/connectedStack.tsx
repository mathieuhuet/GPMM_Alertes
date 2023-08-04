import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Dashboard from '../screens/dashboard';
import More from '../screens/more/more';
import ChangeName from '../screens/more/changeName';
import DeleteAccount from '../screens/more/deleteAccount';


const Stack = createNativeStackNavigator();


const ConnectedStack: FunctionComponent = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='Dashboard'
      >
        <Stack.Screen
          name='Dashboard'
          component={Dashboard}
        />
        <Stack.Screen
          name='More'
          component={More}
        />
        <Stack.Screen
          name='ChangeName'
          component={ChangeName}
        />
        <Stack.Screen
          name='DeleteAccount'
          component={DeleteAccount}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ConnectedStack;