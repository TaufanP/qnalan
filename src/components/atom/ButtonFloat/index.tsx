import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import Button from "../Button";
import styles from "./styles";

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

export default ButtonFloat;
