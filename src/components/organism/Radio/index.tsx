import React, { FC } from "react";
import { View } from "react-native";
import { RadioButton } from "../../molecule";
import styles from "./styles";

interface RadioValue {
  label: string;
  value: any;
}

interface RadioProps {
  data: RadioValue[];
  onPress?: any;
  selected?: any;
}

const Radio: FC<RadioProps> = ({
  data,
  onPress = (e: any) => console.log(e),
  selected = null,
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      {data.map((radioValue: RadioValue) => (
        <RadioButton
          onPress={() => onPress(radioValue.value)}
          isSelected={selected == radioValue.value}
          label={radioValue.label}
          key={radioValue.value}
        />
      ))}
    </View>
  );
};

export default Radio;
