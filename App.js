import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./app/MainNavigator";
import LoginProvider from "./app/context/LoginProvider";

import { LogBox } from 'react-native';
import { theme } from './theme';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer 
       theme={theme}
      >
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}
