import React, { useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import FormSubmitButton from "./FormSubmitButton";

const TransactionInput = (props) => {
  const placeholder = props.type === "income" ? "Income Type" : "Expense Type";

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
          style={styles.picker}
        >
          <Picker.Item label={placeholder} value="" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
      <TextInput
        mode="outlined"
        {...props}
        placeholder="Amount"
        style={styles.input}
        keyboardType="numeric"
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
      <Text style={styles.dateText}>Date: {date.toLocaleDateString()}</Text>
      <FormSubmitButton
        onPress={() => console.log("Pressed")}
        title="Add"
        submitting={false}
      />
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
});

export default TransactionInput;
