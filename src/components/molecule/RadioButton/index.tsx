import React from "react";
import { View } from "react-native";
import { Button, TextItem } from "../../atom";
import styles from "./styles";

interface RadioButtonProps {
  isSelected: boolean;
  label: string;
  onPress?: any;
}

const RadioButton = ({ onPress, label, isSelected }: RadioButtonProps) => {
  const s = styles();
  return (
    <Button style={s.childCont} onPress={onPress}>
      <View style={s.outer}>{isSelected && <View style={s.inner} />}</View>
      <TextItem>{label}</TextItem>
    </Button>
  );
};

export default RadioButton;
