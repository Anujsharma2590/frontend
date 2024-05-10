import * as React from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import List from "./ui/List";

const AllRoute = () => <List />;

const DayRoute = () => <List />;

const WeekRoute = () => <List />;

const MonthRoute = () => <List />;
const YearRoute = () => <List />;

const renderScene = SceneMap({
  first: AllRoute,
  second: DayRoute,
  third: WeekRoute,
  fourth: MonthRoute,
  fifth: YearRoute,
});

export default function Transactions() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "first", title: "All" },
    { key: "second", title: "Day" },
    { key: "third", title: "Week" },
    { key: "fourth", title: "Month" },
    { key: "fifth", title: "Year" },
  ]);

  const tabBarStyle = {
    backgroundColor: "#fff", // Background color of the tab bar
    elevation: 0, // Android elevation for tab bar
    shadowOpacity: 0, // iOS shadow opacity for tab bar
    borderBottomWidth: 1, // Border bottom width
    borderBottomColor: "#ccc", // Border bottom color
    marginBottom: 10, // Margin top for tab bar
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#ff4081" }}
      style={tabBarStyle}
      labelStyle={{ color: "#333" }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}
