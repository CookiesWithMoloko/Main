import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartPage from './src/pages/start_page.js';
import AuthPage from './src/pages/auth.js';
import RegisterPage from './src/pages/reg.js';


const Stack = createStackNavigator();

export default class App extends React.Component{
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartPage">
          <Stack.Screen 
            name="StartPage" 
            component={StartPage} 
            options={{title: 'Стартовая страница'}}
          />
          <Stack.Screen 
            name="AuthPage" 
            component={AuthPage} 
            options={{title: 'Авторизация'}}
          />
          <Stack.Screen 
            name="RegisterPage" 
            component={RegisterPage} 
            options={{title: 'Регистрация'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}