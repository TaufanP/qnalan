import React, { FC, memo, PropsWithChildren } from "react";
import { Text, TextProps, View, ViewStyle } from "react-native";
import styles from "./styles";

interface TextItemProps {
  type?: string;
  isNumber?: boolean;
  unit?: string;
  unitType?: string;
  withUnit?: boolean;
  containerStyle?: ViewStyle;
}

const TextItem: FC<PropsWithChildren<TextItemProps & TextProps>> = ({
  isNumber = false,
  children,
  style,
  type = "",
  unit = "Rp",
  unitType = "none",
  withUnit = true,
  containerStyle,
  ...props
}) => {
  const s: { [key: string]: any } = styles();

  return (
    <View style={[s.container, containerStyle]}>
      {isNumber && withUnit && (
        <Text style={[s.unitText, s[unitType]]}>{unit} </Text>
      )}
      <Text {...props} style={[s.default, style, s[type]]}>
        {isNumber && children
          ? `${children.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`
          : children}
      </Text>
    </View>
  );
};
export default memo(TextItem);
