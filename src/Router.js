import 'react-native-gesture-handler';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Register from './Screens/Register';
import AddCharacter from './Screens/AddCharacter';
import CharacterDetail from './Screens/CharacterDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import { LOCAL_AUTH_ID, USER } from './actions/types';

const Stack = createStackNavigator()

function Router (props) {
  return (
    <NavigationContainer
      ref={navigationRef}
      initialRouteName='Login'
    >
      <Stack.Navigator>

        <Stack.Screen
          name = 'Login'
          component = {Login}
        />

        <Stack.Screen
          name = 'Home'
          component = {Home}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.removeItem(LOCAL_AUTH_ID)
                  USER.token = null
                  navigation.replace('Login')
                }}
                style={{
                  marginLeft: 20
                }}
              >
                <Image
                  source={require('./img/logout.png')}
                  style={{ width: 20, height: 20, margin: 10 }}
                />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name = 'Register'
          component = {Register}
        />

        <Stack.Screen
          name = 'Add Character'
          component = {AddCharacter}
        />

        <Stack.Screen
          name = 'Character Detail'
          component = {CharacterDetail}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
