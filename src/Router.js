import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Screens/Home'

const Stack = createStackNavigator()

function Router () {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name = 'Home'
          component = {Home}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Router;
