import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";
import { colorsPalette as cp, spacing as sp } from "../../constants";

interface ButtonFloatProps {
  navigation?: CompositeNavigationProp<any, any>;
  onPress: any;
}

const ButtonFloat: FC<PropsWithChildren<ButtonFloatProps>> = ({
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
      backgroundColor: cp.main,
      height: 54,
      width: 54,
      borderRadius: 54,
      position: "absolute",
      bottom: sp.xl,
      right: sp.xl,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default ButtonFloat;
