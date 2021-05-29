import React, { FC, memo, PropsWithChildren } from "react";
import { StyleSheet, Text, TextProps, View, ViewStyle } from "react-native";
import { colorsPalette as cp } from "../../constants";

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

const styles = () =>
  StyleSheet.create({
    // UNIT

    // TEXT
    bold12Main: { fontWeight: "bold", fontSize: 12, color: cp.main },
    bold14White: { fontWeight: "bold", fontSize: 14, color: cp.white },

    normal12Main: { fontWeight: "normal", fontSize: 12, color: cp.main },
    normal20White: { fontWeight: "normal", fontSize: 20, color: cp.white },

    // COLOR
    defaultWhite: { color: cp.white },
    defaultMain: { color: cp.main },

    logo: { color: cp.main, fontSize: 24 },
    container: { flexDirection: "row", alignItems: "flex-end" },
    unitText: {
      color: cp.main,
    },
    default: {},

    warningText: {
      marginLeft: 4,
      color: cp.yellow1,
      fontSize: 12,
    },

    // ==============================
  });
