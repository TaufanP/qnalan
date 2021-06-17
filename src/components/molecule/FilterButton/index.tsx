import React, { FC } from "react";
import { View } from "react-native";
import { Button, TextItem } from "../../atom";
import styles from "./styles";

interface FilterButtonProps {
  label?: string;
  count?: number;
  onPress?: any;
}

const FilterButton: FC<FilterButtonProps> = ({ label, count, onPress }) => {
  const isCounting = count !== undefined && count > 0;
  const s = styles({ isCounting });
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
