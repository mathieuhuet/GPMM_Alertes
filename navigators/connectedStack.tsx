import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import Dashboard from '../screens/dashboard';
import More from '../screens/more/more';
import ChangeIcon from '../screens/more/changeIcon';
import Create from '../screens/create';


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
          name='ChangeIcon'
          component={ChangeIcon}
        />
        <Stack.Screen
          name='Create'
          component={Create}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ConnectedStack;