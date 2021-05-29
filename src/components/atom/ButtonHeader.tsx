import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { colorsPalette as cp } from "../../constants";
interface ButtonHeaderProps {
  navigation?: CompositeNavigationProp<any, any>;
}

const ButtonHeader: FC<PropsWithChildren<ButtonHeaderProps>> = ({
  children,
}) => {
  const s = styles();
  return <View style={s.container}>{children}</View>;
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
