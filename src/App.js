/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider } from 'react-redux';
import User from './screens/user';
import UserAddScreen from './screens/user/useradd';
import { store } from './store';

const App = () => {
  const Stack = createStackNavigator();

  const UserScreen = () =>{
    return (
      <User/>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown : false}}>
          <Stack.Screen name="User" component ={UserScreen}/>
          <Stack.Screen name="UserAdd" component ={UserAddScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
