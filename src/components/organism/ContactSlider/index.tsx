import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const Notch = (props: any) => {
  return <View style={styles.notchStyle} {...props} />;
};

const Thumb = () => {
  return <View style={styles.thumbStyle} />;
};

const Rail = () => {
  return <View style={styles.railStyle} />;
};

const RailSelected = () => {
  return <View style={styles.railSelectedStyle} />;
};

const Label = ({ text, ...restProps }: any) => {
  return (
    <View style={styles.labelStyle} {...restProps}>
      <Text style={styles.labelTextStyle}>{text}</Text>
    </View>
  );
};

export { Label, Notch, Rail, RailSelected, Thumb };
