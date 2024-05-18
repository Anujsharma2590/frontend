import client from "./client";
import * as SecureStore from "expo-secure-store";


export const updateTransaction = async (transactionId, updatedTransaction) => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    const response = await client.put(`transaction/${transactionId}`, updatedTransaction, {
      headers: {
        Authorization: `${token}`, 
      },
    });

    if (!response.data.success) {
      throw new Error("Failed to edit transaction");
    }

  } catch (error) {
    console.error("Error editing transaction:", error);
    throw error;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    const response = await client.delete(`transaction/${transactionId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (!response.data.success) {
      throw new Error("Failed to delete transaction");
    }
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

