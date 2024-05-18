import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomButton = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: "rgba(27,27,51,1)" }]}
    >
      <View style={styles.buttonContent}>
        <Icon name={icon} size={18} color="#fff" style={styles.icon} />
        <Text style={styles.submit}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5, // Adjust the margin as needed
  },
  submit: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
