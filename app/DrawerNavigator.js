import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Home from "./components/Home";
import Transactions from "./components/Transactions";
import AddExpenceIncome from "./components/AddExpenceIncome";
import { useLogin } from "./context/LoginProvider";

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const { profile, logout } = useLogin();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{profile?.name || ""}</Text>
            <Text style={styles.profileEmail}>{profile?.email || ""}</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 50,
          paddingHorizontal: 20,
        }}
      >
        <Button onPress={logout} title="Log Out" />
      </View>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleAlign: "center",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        component={Home}
        name="Home"
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        component={Transactions}
        name="Transactions"
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "receipt" : "receipt-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        component={AddExpenceIncome}
        name="Add Expense"
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "cash" : "cash-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        component={AddExpenceIncome}
        name="Add Income"
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    marginBottom: 20,
    borderColor: "#e0e0e0",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileDetails: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 16,
    color: "#777",
  },
});
export default DrawerNavigator;
