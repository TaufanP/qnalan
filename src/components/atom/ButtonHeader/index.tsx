import React, { FC, PropsWithChildren } from "react";
import { ViewStyle } from "react-native";
import Button from "../Button";
import styles from "./styles";

interface ButtonHeaderProps {
  onPress?: any;
  style?: ViewStyle;
}

const ButtonHeader = ({
  children,
  onPress,
  style,
}: PropsWithChildren<ButtonHeaderProps>) => {
  const s = styles();
  return (
    <Button style={[s.container, style]} onPress={onPress}>
      {children}
    </Button>
  );
};

export default ButtonHeader;
