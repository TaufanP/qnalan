import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { colorsPalette as cp } from "../../constants";
import Button from "./Button";
interface ButtonHeaderProps {
  onPress?: any;
}

const ButtonHeader: FC<PropsWithChildren<ButtonHeaderProps>> = ({
  children,
  onPress,
}) => {
  const s = styles();
  return (
    <Button style={s.container} onPress={onPress}>
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
