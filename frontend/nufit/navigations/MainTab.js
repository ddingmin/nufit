import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import { Home, MyPage, StaticPie, Temp } from '../screens';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { height: 75 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          color = 'black';

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Graph') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Temp') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Mypage') {
            iconName = focused ? 'ios-person-circle' : 'ios-person-outline';
          }

          return <Ionic name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{tabBarLabel : '홈'}}/>
      <Tab.Screen name="Graph" component={StaticPie} options={{tabBarLabel : '기록 및 통계'}}/>
      <Tab.Screen name="Temp" component={Temp} options={{tabBarLabel : 'temp'}}/>
      <Tab.Screen name="MyPage" component={MyPage} options={{tabBarLabel : '마이'}}/>
    </Tab.Navigator>
  )
}

export default MainTab

const styles = StyleSheet.create({})