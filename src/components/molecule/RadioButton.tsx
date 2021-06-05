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
interface RadioButtonProps {
  onPress?: any;
  label: string;
  isSelected: boolean;
}

const mainSize = 20;
const childSize = 12;

const RadioButton: FC<RadioButtonProps> = ({ onPress, label, isSelected }) => {
  const s = styles();
  return (
    <Button style={s.childCont} onPress={onPress}>
      <View style={s.outer}>{isSelected && <View style={s.inner} />}</View>
      <TextItem>{label}</TextItem>
    </Button>
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

export default RadioButton;
