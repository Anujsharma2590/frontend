import client from "../../api/client";
import * as SecureStore from "expo-secure-store";


export const updateTransaction = async (transaction) => {
    console.log(transaction);
    return transaction;
  try {
    // const response = await axios.put(`${API_BASE_URL}/transactions/${transaction.id}`, transaction);
    return transaction;
  } catch (error) {
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

