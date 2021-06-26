import React, { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { colorsPalette as cp } from "../../../constants";
import LoadingButton from "../LoadingButton";
import styles from "./styles";

interface ButtonProps {
  defaultLoading?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  styleKey?: string;
}

const Button = ({
  children,
  defaultLoading = false,
  isLoading = false,
  style,
  styleKey = "default",
  ...props
}: PropsWithChildren<ButtonProps & TouchableOpacityProps>) => {
  const s: { [key: string]: any } = styles();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[s[styleKey], style]}
      {...props}
    >
      {isLoading ? (
        defaultLoading ? (
          <ActivityIndicator size="large" color={cp.white} />
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
