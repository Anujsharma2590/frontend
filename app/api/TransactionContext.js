import React, { createContext, useState, useContext, useEffect } from "react";
import client from "./client";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, StyleSheet, View} from "react-native";
import { useLogin } from "../context/LoginProvider";

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const {profile} = useLogin();
  const [transactions, setTransactions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    console.log(profile);
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        setIsLoading(false);
        return;
      }
      const userId = profile.id;
      const response = await client.get(`/transactions?userId=${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response) {
        setTransactions(response.data);
      } else {
        console.error("Error fetching transactions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions , setTransactions}}>
      {isLoading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        children
      )}
    </TransactionsContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export const useTransactions = () => useContext(TransactionsContext);
