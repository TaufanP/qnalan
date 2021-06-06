import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { spacing as sp } from "../../constants";
import { CheckBox } from "../molecule";

interface CheckBoxValue {
  label: string;
  value: number;
}

interface CheckBoxesProps {
  data: CheckBoxValue[];
  onPress?: any;
  selected?: number[];
}

const CheckBoxes: FC<CheckBoxesProps> = ({
  data,
  onPress = (e: any) => console.log(e),
  selected = [],
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      {data.map((check: CheckBoxValue) => (
        <CheckBox
          key={check.value}
          label={check.label}
          value={true}
          onPress={() => onPress(check.value)}
          isSelected={selected.findIndex((id) => id == check.value) !== -1}
        />
      ))}
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: { marginVertical: sp.sm },
  });

export default CheckBoxes;
