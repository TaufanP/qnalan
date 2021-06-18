import React, { PropsWithChildren } from "react";
import Button from "../Button";
import styles from "./styles";

interface ButtonFloatProps {
  onPress: any;
}

const ButtonFloat = ({
  children,
  onPress,
}: PropsWithChildren<ButtonFloatProps>) => {
  const s = styles();
  return (
    <Button style={s.container} onPress={onPress}>
      {children}
    </Button>
  );
};

export default ButtonFloat;
