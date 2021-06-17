import React, { FC } from "react";
import { ScrollView } from "react-native";
import { FilterButton } from "../../molecule";
import styles from "./styles";

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

export default Filters;
