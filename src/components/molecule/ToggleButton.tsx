import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import { Button, TextItem } from "../atom";
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

const styles = ({ isSelected }: { isSelected: boolean }) =>
  StyleSheet.create({
    childCont: {
      flexDirection: "row",
      marginRight: sp.ss,
      marginVertical: sp.ss,
      borderWidth: 1,
      borderColor: cp.blue3,
      paddingHorizontal: sp.sm,
      paddingVertical: sp.ss,
      borderRadius: 8,
      backgroundColor: isSelected ? cp.blue3 : "transparent",
    },
  });

export default ToggleButton;
