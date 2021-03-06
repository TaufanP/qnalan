import React from "react";
import { View } from "react-native";
import { CheckBox } from "../../molecule";
import styles from "./styles";

interface CheckBoxValue {
  label: string;
  value: number;
}

interface CheckBoxesProps {
  data: CheckBoxValue[];
  onPress?: any;
  selected?: number[];
}

const CheckBoxes = ({
  data,
  onPress = (e: any) => console.log(e),
  selected = [],
}: CheckBoxesProps) => {
  const s = styles();
  return (
    <View style={s.container}>
      {data.map((check: CheckBoxValue) => (
        <CheckBox
          key={check.value}
          label={check.label}
          onPress={() => onPress(check.value)}
          isSelected={selected.findIndex((id) => id == check.value) !== -1}
        />
      ))}
    </View>
  );
};

export default CheckBoxes;
