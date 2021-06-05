import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import { Button, TextItem } from "../atom";

interface FilterButtonProps {
  label?: string;
  count?: number;
}

const FilterButton: FC<FilterButtonProps> = ({ label, count }) => {
  const isCounting = count !== undefined && count > 0;
  const s = styles({ isCounting });
  return (
    <Button style={s.container}>
      {count !== 0 && (
        <View style={s.counterCont}>
          <TextItem
            style={{ fontSize: 11, color: isCounting ? cp.blue3 : cp.white }}
          >
            {count}
          </TextItem>
        </View>
      )}
      <TextItem type={`normal14${isCounting ? "White" : "Blue3"}`}>
        {label}
      </TextItem>
    </Button>
  );
};

export default FilterButton;

const styles = ({ isCounting }: { isCounting: boolean }) =>
  StyleSheet.create({
    counterCont: {
      borderWidth: 1,
      borderColor: isCounting ? cp.white : cp.blue3,
      backgroundColor: isCounting ? cp.white : cp.blue3,
      marginRight: 8,
      borderRadius: 4,
      width: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      flexDirection: "row",
      paddingHorizontal: 8,
      borderColor: cp.blue3,
      borderWidth: 1,
      alignItems: "center",
      borderRadius: 8,
      paddingVertical: 4,
      marginRight: sp.sm,
      marginBottom: sp.ss,
      backgroundColor: isCounting ? cp.blue3 : "transparent",
    },
  });
