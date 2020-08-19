import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createStackNavigator();

const NavigationStack = () => (
  <Stack.Navigator initialRouteName="Login" headerMode="none">
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

const App = () => {
  return <NavigationContainer>{NavigationStack()}</NavigationContainer>;
};

export default App;

const styles = StyleSheet.create({});
