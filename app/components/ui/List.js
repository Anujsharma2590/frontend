import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  item: {
    fontSize: 22,
    fontWeight: "bold",
  },
  expenseText: {
    color: "#FF6347", // Red color for expenses
  },
  incomeText: {
    color: "#32CD32", // Green color for income
  },
  date: {
    color: "#808080",
  },
  row: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

const List = () => {
  const renderDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    return formattedDate;
  };

  const getOrdinalSuffix = (number) => {
    if (number === 1 || number === 21 || number === 31) return "st";
    if (number === 2 || number === 22) return "nd";
    if (number === 3 || number === 23) return "rd";
    return "th";
  };
  const renderItem = ({ item }) => {
    const transactionTypeStyle =
      item.transaction_category === "expense"
        ? styles.expenseText
        : styles.incomeText;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <Text style={styles.item}>{item.type}</Text>
          <Text style={styles.date}>{renderDate(item.date)}</Text>
        </View>
        <View>
          <Text style={[styles.item, transactionTypeStyle]}>
            ₹{item.amount.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default List;

const data = [
  {
    id: 1,
    transaction_category: "expense",
    type: "food",
    amount: 50.25,
    date: "2024-05-09T12:30:00Z",
  },
  {
    id: 2,
    transaction_category: "expense",
    type: "transportation",
    amount: 30.5,
    date: "2024-05-08T10:15:00Z",
  },
  {
    id: 3,
    transaction_category: "income",
    type: "salary",
    amount: 1500.0,
    date: "2024-05-05T08:00:00Z",
  },
  {
    id: 147,
    transaction_category: "expense",
    type: "food",
    amount: 50.25,
    date: "2024-05-09T12:30:00Z",
  },
  {
    id: 20,
    transaction_category: "expense",
    type: "transportation",
    amount: 30.5,
    date: "2024-05-08T10:15:00Z",
  },
  {
    id: 78,
    transaction_category: "income",
    type: "salary",
    amount: 1500.0,
    date: "2024-05-05T08:00:00Z",
  },
  {
    id: 90,
    transaction_category: "expense",
    type: "food",
    amount: 50.25,
    date: "2024-05-09T12:30:00Z",
  },
  {
    id: 36,
    transaction_category: "expense",
    type: "transportation",
    amount: 30.5,
    date: "2024-05-08T10:15:00Z",
  },
  {
    id: 67,
    transaction_category: "income",
    type: "salary",
    amount: 1500.0,
    date: "2024-05-05T08:00:00Z",
  },
  {
    id: 23,
    transaction_category: "expense",
    type: "food",
    amount: 50.25,
    date: "2024-05-09T12:30:00Z",
  },
  {
    id: 234,
    transaction_category: "expense",
    type: "transportation",
    amount: 30.5,
    date: "2024-05-08T10:15:00Z",
  },
  {
    id: 123,
    transaction_category: "income",
    type: "salary",
    amount: 7678.0,
    date: "2024-05-05T08:00:00Z",
  },
];
