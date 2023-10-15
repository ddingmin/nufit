import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Navigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
      <NavigationContainer>
        {isLoggedIn ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    );
  };
  
  export default Navigation;