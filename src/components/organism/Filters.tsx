import React, { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { spacing as sp } from "../../constants";
import { FilterButton } from "../molecule";

interface CheckBoxValue {
  label: string;
  value: any;
  count: number;
}

interface FiltersProps {
  data: CheckBoxValue[];
  onPress?: any;
  selected?: number[];
}

const Filters: FC<FiltersProps> = ({
  data,
  onPress = (e: any) => console.log(e),
  selected = [],
}) => {
  const s = styles();
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.container}
    >
      {data.map((check: CheckBoxValue) => (
        <FilterButton
          key={check.value}
          label={check.label}
          count={check.count}
        />
      ))}
    </ScrollView>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      height: 36,
      marginVertical: sp.sm,
      flexDirection: "row",
      paddingHorizontal: sp.sm,
    },
  });

export default Filters;
