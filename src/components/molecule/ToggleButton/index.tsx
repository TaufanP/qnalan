import React, { FC } from "react";
import { Button, TextItem } from "../../atom";
import styles from "./styles";

interface ToggleButtonProps {
  onPress?: any;
  label: string;
  isSelected: boolean;
}

const ToggleButton: FC<ToggleButtonProps> = ({
  onPress,
  label,
  isSelected,
}) => {
  const s = styles({ isSelected });
  return (
    <Button style={s.childCont} onPress={onPress}>
      <TextItem type={`bold14${isSelected ? "White" : "Blue3"}`}>
        {label}
      </TextItem>
    </Button>
  );
};

export default ToggleButton;
