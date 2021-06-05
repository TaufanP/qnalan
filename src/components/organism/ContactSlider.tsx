import React from "react";
import { View, Text } from "react-native";

const THUMB_RADIUS = 12;

const Notch = (props: any) => {
  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "#4499ff",
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 8,
      }}
      {...props}
    />
  );
};
const Thumb = () => {
  return (
    <View
      style={{
        width: THUMB_RADIUS * 2,
        height: THUMB_RADIUS * 2,
        borderRadius: THUMB_RADIUS,
        borderWidth: 2,
        borderColor: "#7f7f7f",
        backgroundColor: "#ffffff",
      }}
    />
  );
};
const Rail = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 4,
        borderRadius: 2,
        backgroundColor: "#7f7f7f",
      }}
    />
  );
};
const RailSelected = () => {
  return (
    <View
      style={{
        height: 4,
        backgroundColor: "#4499ff",
        borderRadius: 2,
      }}
    />
  );
};
const Label = ({ text, ...restProps }: any) => {
  return (
    <View
      style={{
        alignItems: "center",
        padding: 8,
        backgroundColor: "#4499ff",
        borderRadius: 4,
      }}
      {...restProps}
    >
      <Text
        style={{
          fontSize: 16,
          color: "#fff",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export { Label, Notch, Rail, RailSelected, Thumb };
