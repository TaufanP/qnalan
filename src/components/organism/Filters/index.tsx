import React from "react";
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
}

const Filters = ({ data }: FiltersProps) => {
  const s = styles();
  return (
    <ScrollView
      horizontal
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
