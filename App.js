import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./app/MainNavigator";
import LoginProvider from "./app/context/LoginProvider";
import SplashScreenView from "./SplashScreenView";

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  }, [isShowSplash]);
  return isShowSplash ? <SplashScreenView /> : <AppContainer />;
}

const AppContainer = () => {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
};
