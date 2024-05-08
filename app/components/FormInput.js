import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const FormInput = (props) => {
  const { placeholder, label, error } = props;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{label}</Text>
        {error ? (
          <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
        ) : null}
      </View>
      <TextInput {...props} placeholder={placeholder} style={styles.input} />
    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#1b1b33",
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    height: 35,
    marginBottom: 20,
  },
});
