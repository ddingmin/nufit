import { createStackNavigator } from "@react-navigation/stack";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import Navigation from './navigations';


const Stack = createStackNavigator();

export default function App() {
  const fetchFonts = () => {
    return Font.loadAsync({
      
      "Pretendard-Light": require("./assets/fonts/Pretendard-Light.otf"),
      "Pretendard-Black": require("./assets/fonts/Pretendard-Black.otf"),
      "Pretendard-Bold": require("./assets/fonts/Pretendard-Bold.otf"),
      "Pretendard-ExtraBold": require("./assets/fonts/Pretendard-ExtraBold.otf"),
      "Pretendard-Thin": require("./assets/fonts/Pretendard-Thin.otf"),
      "Pretendard-ExtraLight": require("./assets/fonts/Pretendard-ExtraLight.otf"),
      "Pretendard-SemiBold": require("./assets/fonts/Pretendard-SemiBold.otf"),
      "Pretendard-Regular": require("./assets/fonts/Pretendard-Regular.otf"),
      "Pretendard-Medium": require("./assets/fonts/Pretendard-Medium.otf"),
    });
  };

  const preload = async () => {
    //AsyncStorage에서 꺼내와야 하는 아이템 출력
   return await fetchFonts(); 
  }

  
  useEffect(()=> {
    preload().then((context)=> {
      SplashScreen.hideAsync();
    });
  }, []); 


  return (
    <Navigation/>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     {/* <Stack.Screen  options={{headerShown: false,}} name="ChooseSearch" component={ChooseSearch} />
    //     <Stack.Screen name="Search" component={Search} />
    //     <Stack.Screen name="SearchDetail" component={SearchDetail} /> */}
    //     <Stack.Screen options={{headerShown: false,}} name="SetGoal" component={SetGoal} />
    //     <Stack.Screen options={{headerShown: false,}} name="CaloriesResult" component={CaloriesResult} />
    //     <Stack.Screen options={{headerShown: false,}} name="NutResult" component={NutResult} />
    //     <Stack.Screen 
    //       name="StaticPie" 
    //       options={{headerShown: false,}}
    //       component={StaticPie} />
    //   </Stack.Navigator> 
    // </NavigationContainer>
  );
}
