import React from "react";
import { Button, TextItem } from "../../atom";
import styles from "./styles";

interface ToggleButtonProps {
  isSelected: boolean;
  label: string;
  onPress?: any;
}

const ToggleButton = ({ isSelected, label, onPress }: ToggleButtonProps) => {
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
