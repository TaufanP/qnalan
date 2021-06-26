import React, { FC } from "react";
import { View } from "react-native";
import { Button, TextItem } from "../../atom";
import styles from "./styles";

interface FilterButtonProps {
  count?: number;
  label?: string;
  onPress?: any;
}

const FilterButton = ({ label, count, onPress }: FilterButtonProps) => {
  const s = styles();
  return (
    <Button style={s.container} onPress={onPress}>
      {count !== 0 && (
        <View style={s.counterCont}>
          <TextItem style={s.countText}>{count}</TextItem>
        </View>
      )}
      <TextItem type={`normal14Blue3`}>{label}</TextItem>
    </Button>
  );
};

export default FilterButton;
