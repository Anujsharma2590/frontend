import React, { useState } from "react";
import { View, StyleSheet, Button, Text, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import client from "../api/client";
import * as SecureStore from "expo-secure-store";
import CustomButton from "./ui/CustomButton";

import { formatDate } from "../utils/methods";

const TransactionInput = (props) => {
  const value = props.type === "income" ? "bonus" : "utils";

  const [values, setValues] = useState({ heading: value, amount: "", date: new Date() });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setValues({ ...values, date: currentDate });
  };

  const submitTransaction = async () => {
    try {
      const formattedDate = formatDate(values.date);
      const transactionValues = { ...values, date: formattedDate };
  
      if (props.type === "income") {
        await submitIncome(transactionValues);
      } else {
        await submitExpense(transactionValues);
      }
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  const submitIncome = async (values) => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        return;
      }
      const response = await client.post("/income", values, {
        headers: {
          Authorization: `${token}`, // Add the authorization token
        },
      });

      if (response) {
        Alert.alert(
          'Success!',
          `${response.data.message}`,
          [
            {
              text: 'OK',
            },
          ],
          { cancelable: false },
        );
        setValues({ heading: value, amount: "", date: new Date() }); 
      } else {
        console.error("Error fetching transactions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const submitExpense = async (values) => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        return;
      }
      const response = await client.post("/expense", values, {
        headers: {
          Authorization: `${token}`, // Add the authorization token
        }
      });

      if (response) {
        Alert.alert(
          'Success!',
          `${response.data.message}`,
          [
            {
              text: 'OK',
            },
          ],
          { cancelable: false },
        );
        setValues({ heading: value, amount: "", date: new Date() }); 
      } else {
        console.error("Error fetching transactions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={values.heading}
          onValueChange={(itemValue) => handleChange("heading", itemValue)}
          style={styles.picker}
        >
          {props.dropdownData.map((item, index) => (
            <Picker.Item
              key={index}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
      <TextInput
        mode="outlined"
        placeholder="Amount"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => handleChange("amount", text)}
        value={values.amount}
      />
      <View style={styles.datePickerContainer}>
        <Button onPress={toggleDatePicker} title="Select Date" />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="calendar"
            onChange={onChangeDate}
          />
        )}
      </View>
      <Text style={styles.dateText}>
        Date: {values.date.toLocaleDateString()}
      </Text>
      <CustomButton onPress={submitTransaction} title="ADD" icon = "plus" disabled={!values.amount}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  inputContainer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  input: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    backgroundColor: "#ffffff",
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  dateText: {
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default TransactionInput;
