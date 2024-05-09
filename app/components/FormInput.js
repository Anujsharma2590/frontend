import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const FormInput = (props) => {
  const { placeholder, error, icon } = props;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        {error ? (
          <Text style={{ color: "red", fontSize: 12, marginBottom: 0 }}>
            {error}
          </Text>
        ) : null}
      </View>
      <TextInput
        mode="outlined"
        {...props}
        placeholder={placeholder}
        style={styles.input}
        left={<TextInput.Icon icon={icon} />}
      />
    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
});
