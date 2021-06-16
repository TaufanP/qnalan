import React, { FC, PropsWithChildren } from "react";
import { ViewStyle } from "react-native";
import Button from "../Button";
import styles from "./styles";

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

export default ButtonHeader;
