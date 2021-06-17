import React, { FC } from "react";
import { View } from "react-native";
import { Button, TextItem } from "../../atom";
import styles from "./styles";

interface RadioButtonProps {
  onPress?: any;
  label: string;
  isSelected: boolean;
}

const RadioButton: FC<RadioButtonProps> = ({ onPress, label, isSelected }) => {
  const s = styles();
  return (
    <Button style={s.childCont} onPress={onPress}>
      <View style={s.outer}>{isSelected && <View style={s.inner} />}</View>
      <TextItem>{label}</TextItem>
    </Button>
  );
};

export default RadioButton;
