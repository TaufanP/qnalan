import React, { FC } from "react";
import { View, ViewStyle } from "react-native";
import { ToggleButton } from "../../molecule";
import styles from "./styles";

interface CheckBoxValue {
  label: string;
  value: number;
}

interface CheckBoxesProps {
  data: CheckBoxValue[];
  onPress?: any;
  selected?: number[];
  containerStyle?: ViewStyle;
}

const ToggleButtons: FC<CheckBoxesProps> = ({
  data,
  onPress = (e: any) => console.log(e),
  selected = [],
  containerStyle,
}) => {
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
