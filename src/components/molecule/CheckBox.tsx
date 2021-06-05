import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import { Button, TextItem } from "../atom";

interface CheckBoxProps {
  value: boolean;
  label: string;
  onPress?: any;
  isSelected?: boolean;
}

const mainSize = 20;
const childSize = 12;

const CheckBox: FC<CheckBoxProps> = ({ value, label, onPress, isSelected }) => {
  const s = styles();
  return (
    <Button onPress={onPress} style={s.container}>
      <View style={s.outer}>{isSelected && <View style={s.inner} />}</View>
      <TextItem>{label}</TextItem>
    </Button>
  );
};

const styles = () =>
  StyleSheet.create({
    inner: {
      width: childSize,
      height: childSize,
      backgroundColor: cp.blue3,
    },
    outer: {
      width: mainSize,
      height: mainSize,
      borderColor: cp.blue3,
      borderWidth: 2,
      marginRight: sp.ss,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      flexDirection: "row",
      marginRight: sp.sm,
      alignItems: "center",
      marginBottom: sp.sm,
    },
  });

export default CheckBox;
