import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./app/MainNavigator";
import LoginProvider from "./app/context/LoginProvider";

import { LogBox } from "react-native";
import { theme } from "./theme";
import { PaperProvider } from "react-native-paper";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer theme={theme}>
        <PaperProvider theme={theme}>
          <MainNavigator />
        </PaperProvider>
      </NavigationContainer>
    </LoginProvider>
  );
}
