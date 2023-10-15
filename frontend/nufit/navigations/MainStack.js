import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MainTab from './MainTab';
import { ChooseSearch, Home, Search, SearchDetail } from '../screens';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MainTab' component={MainTab} options={{ headerShown: false }}/>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name='ChooseSearch' component={ChooseSearch} options={{ headerShown: false }}/>
      <Stack.Screen name='Search' component={Search} options={{ headerShown: false }}/>
      <Stack.Screen name='SearchDetail' component={SearchDetail} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default MainStack;