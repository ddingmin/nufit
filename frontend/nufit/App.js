import React, {useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native"; 
import { createStackNavigator } from "@react-navigation/stack";
import CaloriesResult from './screens/CaloriesResult';
import ChooseSearch from './screens/ChooseSearch';
import NutResult from './screens/NutResult';
import Search from './screens/Search';
import SearchDetail from './screens/SearchDetail';
import SetGoal from './screens/SetGoal';
import StaticPie from './screens/StaticPie';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StaticPie" component={StaticPie} />
        <Stack.Screen name="ChooseSearch" component={ChooseSearch} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="SearchDetail" component={SearchDetail} />
        <Stack.Screen name="SetGoal" component={SetGoal} />
        <Stack.Screen name="CaloriesResult" component={CaloriesResult} />
        <Stack.Screen name="NutResult" component={NutResult} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
}