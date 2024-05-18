import React, { createContext, useState, useContext, useEffect } from "react";
import client from "./client";
import * as SecureStore from "expo-secure-store";

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(null);

  const fetchTransactions = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        return;
      }
      const response = await client.get("/transactions", {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response) {
        setTransactions(response.data);
      } else {
        console.error("Error fetching transactions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);
