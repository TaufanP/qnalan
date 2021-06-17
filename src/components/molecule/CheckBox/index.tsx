import React, { FC } from "react";
import { View } from "react-native";
import { Button, TextItem } from "../../atom";
import styles from "./styles";

interface CheckBoxProps {
  value: boolean;
  label: string;
  onPress?: any;
  isSelected?: boolean;
}

const CheckBox: FC<CheckBoxProps> = ({ value, label, onPress, isSelected }) => {
  const s = styles();
  return (
    <Button onPress={onPress} style={s.container}>
      <View style={s.outer}>{isSelected && <View style={s.inner} />}</View>
      <TextItem>{label}</TextItem>
    </Button>
  );
};

export default CheckBox;
