import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import { Button, TextItem } from "../atom";

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
          <TextItem
            style={{ fontSize: 11, color: cp.white, top: -1, left: -1 }}
          >
            {count}
          </TextItem>
        </View>
      )}
      <TextItem type={`normal14Blue3`}>{label}</TextItem>
    </Button>
  );
};

export default FilterButton;

const styles = ({ isCounting }: { isCounting: boolean }) =>
  StyleSheet.create({
    counterCont: {
      borderWidth: 1,
      borderColor: cp.blue3,
      backgroundColor: cp.blue3,
      marginRight: 8,
      borderRadius: 4,
      width: 16,
      height: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      alignSelf: "flex-start",
      flexDirection: "row",
      paddingHorizontal: 8,
      borderColor: cp.blue3,
      borderWidth: 1,
      alignItems: "center",
      borderRadius: 8,
      paddingVertical: 4,
      marginRight: sp.sm,
      marginBottom: sp.ss,
      backgroundColor: "transparent",
    },
  });
