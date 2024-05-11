import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Card from "./ui/Card";
import List from "./ui/List";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

const getMoneyTextStyle = (value) => ({
  fontWeight: "bold",
  fontSize: 18,
  color: value < 0 ? "#ff4500" : "#2e8b57", // Red for negative, custom green for positive
});

const formatMoney = (value) => {
  const absValue = Math.abs(value).toFixed(2);
  return `${value < 0 ? "-" : ""}₹${absValue}`;
};

const Home = () => {
  const navigation = useNavigation();
  const handleSeeAllPress = () => {
    // Navigate to the transactions screen
    navigation.navigate("Transactions");
  };
  return (
    <View style={styles.container}>
      <Card style={{ marginHorizontal: 30, marginVertical: 20 }}>
        <View style={styles.row}>
          <Text style={styles.label}>Total Balance</Text>
          <Text style={getMoneyTextStyle(700)}>{formatMoney(700)}</Text>
        </View>

        <View style={styles.separator} />

        {/* Total Expenses and Savings */}
        <View style={{ flexDirection: "row" }}>
          {/* Total Expenses */}
          <View style={styles.item}>
            <Text style={styles.label}>
              <AntDesign name="arrowdown" size={15} color="#ff4500" />
              Expenses
            </Text>
            <Text style={getMoneyTextStyle(300)}>{formatMoney(300)}</Text>
          </View>

          {/* Separator */}
          <View style={styles.separatorVertical} />
          {/* Savings */}

          <View style={styles.item}>
            <Text style={styles.label}>
              <AntDesign name="arrowup" size={15} color="#2e8b57" />
              Income
            </Text>
            <Text style={getMoneyTextStyle(1000)}>{formatMoney(1000)}</Text>
          </View>
        </View>
      </Card>

      {/* Transactions Heading */}
      <View style={styles.transactionHeading}>
        <Text style={styles.transactionTextHeading}>Transactions</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <List />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  separatorVertical: {
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
  },
  item: {
    flex: 1,
    alignItems: "center",
    marginVertical: 20,
  },
  transactionHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
    marginHorizontal: 15,
  },
  transactionTextHeading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 16,
    color: "#007bff",
  },
  transactionList: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  transactionText: {
    fontSize: 16,
    marginVertical: 50,
  },
});

export default Home;
