import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./app/MainNavigator";
import LoginProvider from "./app/context/LoginProvider";

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}
