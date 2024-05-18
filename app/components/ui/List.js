import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { renderDate, getIcon } from "../../utils/methods";

const List = ({ data }) => {
  const renderItem = ({ item }) => {
    const transactionTypeStyle =
      item.transactionType === "expense"
        ? styles.expenseText
        : styles.incomeText;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            {getIcon(item.transactionType, item.heading)}
          </View>
          <View>
            <Text style={[styles.item, styles.heading]}>{item.heading}</Text>
            <Text style={styles.date}>{renderDate(item.date)}</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.item, transactionTypeStyle]}>
            {item.transactionType === "expense" ? "-" : "+"}${item.amount}
          </Text>
        </View>
      </View>
    );
  };

  return <FlatList data={data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
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
    fontSize: 20,
    fontWeight: "500",
  },
  expenseText: {
    color: "#FF6347", // Red color for expenses
  },
  incomeText: {
    color: "#32CD32", // Green color for income
  },
  date: {
    color: "#808080",
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
  },
  iconContainer: {
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 45,
    height: 45,
  },
});

export default List;
