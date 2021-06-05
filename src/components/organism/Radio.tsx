import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { HamburgerMenu, Search } from "../../../assets";
import {
  strings as str,
  colorsPalette as cp,
  spacing as sp,
} from "../../constants";
import { Button, ButtonHeader, TextItem } from "../atom";
import { RadioButton } from "../molecule";

interface RadioValue {
  label: string;
  value: any;
}

interface RadioProps {
  data: RadioValue[];
  onPress?: any;
  selected?: any;
}

const mainSize = 20;
const childSize = 12;

const Radio: FC<RadioProps> = ({
  data,
  onPress = (e: any) => console.log(e),
  selected = null,
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      {data.map((radioValue: RadioValue) => (
        <RadioButton
          onPress={() => onPress(radioValue.value)}
          isSelected={selected == radioValue.value}
          label={radioValue.label}
          key={radioValue.value}
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
    container: { flexDirection: "row", marginVertical: sp.sm },
  });

export default Radio;
