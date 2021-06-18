import React from "react";
import { View } from "react-native";
import { Button, TextItem } from "../../atom";
import styles from "./styles";

interface CheckBoxProps {
  isSelected?: boolean;
  label: string;
  onPress?: any;
}

const CheckBox = ({ label, onPress, isSelected }: CheckBoxProps) => {
  const s = styles();
  return (
    <Button onPress={onPress} style={s.container}>
      <View style={s.outer}>{isSelected && <View style={s.inner} />}</View>
      <TextItem>{label}</TextItem>
    </Button>
  );
};

export default CheckBox;
