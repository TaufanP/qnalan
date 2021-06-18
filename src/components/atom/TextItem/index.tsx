import React, { FC, memo, PropsWithChildren } from "react";
import { Text, TextProps, View, ViewStyle } from "react-native";
import { colorsPalette as cp } from "../../../constants";
import styles from "./styles";

interface TextItemProps {
  containerStyle?: ViewStyle;
  isNumber?: boolean;
  type?: string;
  unit?: string;
  unitType?: string;
  withUnit?: boolean;
}

const TextItem = ({
  children,
  containerStyle,
  isNumber = false,
  style,
  type = "",
  unit = "Rp",
  unitType = "none",
  withUnit = true,
  ...props
}: PropsWithChildren<TextItemProps & TextProps>) => {
  const s: { [key: string]: any } = styles();
  const typeOne = type
    .split(/\d+/g)
    .filter((char) => char !== "")
    .map((char) => char.toLowerCase());
  const secondGroup = type.match(/\d+/g);
  const typeTwo = secondGroup
    ? secondGroup.filter((char) => char !== "").map((char) => parseInt(char))
    : [];
  const [fontWeight, color] = typeOne;
  const [fontSize, colorSub] = typeTwo;
  const colorKey = `${color}${colorSub || ""}`;
  const completeStyle = [fontWeight, fontSize, colorKey];
  const finalStyle = {
    fontWeight,
    fontSize,
    color: cp[colorKey],
  };
  const textType = completeStyle.includes("undefined") ? s[type] : finalStyle;

  return (
    <View style={[s.container, containerStyle]}>
      {isNumber && withUnit && (
        <Text style={[s.unitText, s[unitType]]}>{unit} </Text>
      )}
      <Text {...props} style={[s.default, style, textType]}>
        {isNumber && children
          ? `${children.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`
          : children}
      </Text>
    </View>
  );
};
export default memo(TextItem);
