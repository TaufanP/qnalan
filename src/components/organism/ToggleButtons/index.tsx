import React from "react";
import { View, ViewStyle } from "react-native";
import { ToggleButton } from "../../molecule";
import styles from "./styles";

interface CheckBoxValue {
  label: string;
  value: number;
}

interface CheckBoxesProps {
  containerStyle?: ViewStyle;
  data: CheckBoxValue[];
  onPress?: any;
  selected?: number[];
}

const ToggleButtons = ({
  containerStyle,
  data,
  onPress = () => console.log("ToggleButtons"),
  selected = [],
}: CheckBoxesProps) => {
  const s = styles();
  return (
    <View style={[s.container, containerStyle]}>
      {data.map((check: CheckBoxValue) => (
        <ToggleButton
          onPress={() => onPress(check.value)}
          isSelected={selected.findIndex((id) => id == check.value) !== -1}
          label={check.label}
          key={check.value}
        />
      ))}
    </View>
  );
};

export default ToggleButtons;
