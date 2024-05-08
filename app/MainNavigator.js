import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AppForm from "./components/AppForm";
import UserProfile from "./components/UserProfile";
import DrawerNavigator from "./DrawerNavigator";
import { useLogin } from "./context/LoginProvider";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name="AppForm" />
      <Stack.Screen component={UserProfile} name="UserProfile" />
    </Stack.Navigator>
  );
};
const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
};
export default MainNavigator;
