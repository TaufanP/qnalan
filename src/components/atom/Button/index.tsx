import React, { FC, PropsWithChildren } from "react";
import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import LoadingButton from "../LoadingButton";
import styles from "./styles";

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
