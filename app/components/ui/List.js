import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { renderDate, getIcon } from "../../utils/methods";
import { Swipeable } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Portal,
  Button,
  Provider,
  Dialog,
  Modal,
  TextInput,
} from "react-native-paper";
import { deleteTransaction, updateTransaction } from "./api"; // Import your API functions
import { useTransactions } from "../../api/TransactionContext";

const List = ({ data }) => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedHeading, setEditedHeading] = useState("");
  const [editedAmount, setEditedAmount] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedTransactionType, setEditedTransactionType] = useState("");
  const { fetchTransactions } = useTransactions();

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditedHeading(item.heading);
    setEditedAmount(item.amount.toString());
    setEditedDate(item.date);
    setEditedTransactionType(item.transactionType);
    setEditModalVisible(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setDeleteModalVisible(true);
  };

  const confirmEdit = async () => {
    console.log(selectedItem);
    try {
      await updateTransaction(selectedItem.id, {
        transactionType: editedTransactionType,
        heading: editedHeading,
        date: editedDate,
        amount: parseFloat(editedAmount),
      });
      setEditModalVisible(false);
      fetchTransactions();
    } catch (error) {
      Alert.alert("Error", "Failed to edit transaction");
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteTransaction(selectedItem.id);
      setDeleteModalVisible(false);
      fetchTransactions();
    } catch (error) {
      Alert.alert("Error", "Failed to delete transaction");
    }
  };

  const renderRightActions = (item) => {
    return (
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.actionText}>
            <FontAwesome name="edit" size={24} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.actionText}>
            <MaterialIcons name="delete" size={24} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const transactionTypeStyle =
      item.transactionType === "expense"
        ? styles.expenseText
        : styles.incomeText;

    return (
      <Swipeable renderRightActions={() => renderRightActions(item)}>
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
      </Swipeable>
    );
  };

  return (
    <Provider>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Edit Modal */}
      <Portal>
        <Modal
          visible={isEditModalVisible}
          onDismiss={() => setEditModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Edit Transaction</Text>
          <TextInput
            style={styles.input}
            label="Heading"
            value={editedHeading}
            onChangeText={setEditedHeading}
          />
          <TextInput
            style={styles.input}
            label="Amount"
            value={editedAmount}
            onChangeText={setEditedAmount}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            label="Date"
            value={editedDate}
            onChangeText={setEditedDate}
          />
          <TextInput
            style={styles.input}
            label="Transaction Type"
            value={editedTransactionType}
            onChangeText={setEditedTransactionType}
          />
          <Button mode="contained" onPress={confirmEdit}>
            Save
          </Button>
          <Button
            mode="text"
            onPress={() => setEditModalVisible(false)}
            color="red"
          >
            Cancel
          </Button>
        </Modal>
      </Portal>

      {/* Delete Dialog */}
      <Portal>
        <Dialog
          visible={isDeleteModalVisible}
          onDismiss={() => setDeleteModalVisible(false)}
        >
          <Dialog.Title>Delete Transaction</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this transaction?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={confirmDelete}>Delete</Button>
            <Button onPress={() => setDeleteModalVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
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
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    borderRadius: 15,
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    borderRadius: 15,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    width: "100%",
  },
});

export default List;
