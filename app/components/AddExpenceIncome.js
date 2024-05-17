import React, { useState } from "react";
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Card from "./ui/Card";
import TransactionInput from "./TransactionInput";
const expenseDropdownData = [
  {
    label: "Utilities",
    value: "utils",
  },

  {
    label: "Electronics",
    value: "electronics",
  },

  {
    label: "Dining Out",
    value: "dine",
  },

  {
    label: "Breakfast Supplies",
    value: "breakfast",
  },
  {
    label: "Groceries",
    value: "grocery",
  },
];

const incomeDropdownData = [
  {
    label: "Bonus",
    value: "bonus",
  },

  {
    label: "Part-time Job",
    value: "parttime",
  },

  {
    label: "Freelance",
    value: "freelance",
  },

  {
    label: "online sales",
    value: "sales",
  },
];
const AddIncome = () => (
  <View>
    <Text style={styles.sceneText}>Add Income</Text>
    <TransactionInput type="income" dropdownData={incomeDropdownData} />
  </View>
);

const AddExpense = () => (
  <View>
    <Text style={styles.sceneText}>Add Expense</Text>
    <TransactionInput type="expense" dropdownData={expenseDropdownData} />
  </View>
);

const renderScene = SceneMap({
  first: AddIncome,
  second: AddExpense,
});

const AddExpenseIncome = ({ route }) => {
  const { type } = route.params;

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(type === "income" ? 0 : 1);

  const tabBarStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 20,
  };

  const renderTabBar = ({ navigationState }) => (
    <View style={tabBarStyle}>
      {navigationState.routes.map((route, i) => (
        <Pressable key={route.key} onPress={() => setIndex(i)}>
          {({ pressed }) => (
            <Card
              style={[
                styles.tab,
                { backgroundColor: pressed ? "#F2EBFE" : "#FFEFEB" },
              ]}
            >
              <Text
                style={[styles.tabText, index === i && styles.activeTabText]}
              >
                {route.title}
              </Text>
            </Card>
          )}
        </Pressable>
      ))}
    </View>
  );

  return (
    <TabView
      navigationState={{
        index,
        routes: [
          { key: "first", title: "Add Income" },
          { key: "second", title: "Add Expense" },
        ],
      }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sceneText: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  tab: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: "#6C63FF",
    fontWeight: "bold",
  },
});

export default AddExpenseIncome;
