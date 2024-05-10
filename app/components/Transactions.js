import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Transactions = () => {
  return (
    <View style={styles.container}>
      <Text>Transactions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Transactions;
