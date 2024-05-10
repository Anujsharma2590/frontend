import React from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
const FormSelectorBtn = ({ title, backgroundColor, style, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.container, style, { backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FormSelectorBtn;
