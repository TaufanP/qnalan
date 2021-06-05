import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { HamburgerMenu, Search } from "../../../assets";
import {
  strings as str,
  colorsPalette as cp,
  spacing as sp,
} from "../../constants";
import { Button, ButtonHeader, TextItem } from "../atom";
import { RadioButton, ToggleButton } from "../molecule";

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

const mainSize = 20;
const childSize = 12;

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
const styles = () =>
  StyleSheet.create({
    inner: {
      width: childSize,
      height: childSize,
      borderRadius: childSize,
      backgroundColor: cp.blue3,
    },
    outer: {
      width: mainSize,
      height: mainSize,
      borderRadius: mainSize,
      borderColor: cp.blue3,
      borderWidth: 2,
      marginRight: sp.ss,
      justifyContent: "center",
      alignItems: "center",
    },
    childCont: {
      flexDirection: "row",
      marginRight: sp.xxxl,
    },
    container: {
      flexDirection: "row",
      marginVertical: sp.sm,
      flexWrap: "wrap",
    },
  });

export default ToggleButtons;
