import React, { FC, PropsWithChildren } from "react";
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import LoadingButton from "./LoadingButton";
import { widthPercent as wp } from "../../config/units";
import { colorsPalette as cp } from "../../constants";

const relativeWidth = wp(80);
const fixedHeightRWRatio = relativeWidth * 0.1519;

interface ButtonProps {
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  styleKey?: string;
  defaultLoading?: boolean;
}

const Button: FC<PropsWithChildren<ButtonProps & TouchableOpacityProps>> = ({
  children,
  isLoading = false,
  style,
  styleKey = "default",
  defaultLoading = false,
  ...props
}) => {
  const s: { [key: string]: any } = styles();
  return (
    <TouchableOpacity
      style={[s[styleKey], style]}
      {...props}
      activeOpacity={0.7}
    >
      {isLoading ? (
        defaultLoading ? (
          <ActivityIndicator size="large" color="#FFF" />
        ) : (
          <LoadingButton />
        )
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = () => {
  const center: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
  };
  const widthRelative: ViewStyle = {
    width: relativeWidth,
    height: fixedHeightRWRatio,
    borderRadius: fixedHeightRWRatio * 0.16,
    ...center,
  };
  return StyleSheet.create({
    center,
    widthRelativeColored: {
      backgroundColor: cp.blue1,
      ...widthRelative,
    },
    widthRelativeBordered: {
      borderWidth: 1,
      borderColor: cp.main,
      ...widthRelative,
    },
  });
};
