import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { colorsPalette as cp } from "../../constants";
import Button from "./Button";
interface ButtonHeaderProps {
  onPress?: any;
  style?: ViewStyle;
}

const ButtonHeader: FC<PropsWithChildren<ButtonHeaderProps>> = ({
  children,
  onPress,
  style,
}) => {
  const s = styles();
  return (
    <Button style={[s.container, style]} onPress={onPress}>
      {children}
    </Button>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      height: 54,
      width: 54,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default ButtonHeader;
