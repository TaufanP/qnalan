import { CompositeNavigationProp } from "@react-navigation/core";
import React from "react";
import {
  Animated,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { EyeClose, EyeOpen } from "../../../../assets";
import Button from "../Button";
import WarningIcon from "../WarningIcon";
import styles from "./styles";

interface TextFieldProps {
  containerStyle?: ViewStyle;
  fieldStyle?: TextStyle;
  isError?: boolean | string;
  isStart?: boolean;
  mainStyle?: ViewStyle;
  renderSideIcon?: () => JSX.Element;
  securePress?: any;
  sideIcon?: boolean;
  warningText?: string | boolean;
  withPadding?: boolean;
}

const translateDistance = 4;

const TextField = ({
  containerStyle,
  fieldStyle,
  isError = false,
  isStart,
  mainStyle,
  renderSideIcon,
  securePress,
  sideIcon = false,
  warningText = "Username fennarex tidak tersedia",
  withPadding = true,
  ...props
}: TextFieldProps & TextInputProps) => {
  const s = styles({ sideIcon, isError, withPadding });
  const renderIcon = renderSideIcon
    ? renderSideIcon
    : () => <>{props.secureTextEntry ? <EyeClose /> : <EyeOpen />}</>;
  const translateX = new Animated.Value(0);

  const translateValue = (toValue: number) =>
    Animated.timing(translateX, {
      duration: 100,
      useNativeDriver: true,
      toValue,
    });

  const triggerError = () => {
    Animated.sequence([
      translateValue(translateDistance),
      translateValue(-translateDistance),
      translateValue(translateDistance),
      translateValue(0),
    ]).start();
  };

  return (
    <View style={mainStyle}>
      <Animated.View style={[s.container, containerStyle]}>
        <TextInput style={[s.input, fieldStyle]} {...props} />
        {sideIcon && (
          <Button style={s.button} onPress={securePress}>
            {renderIcon()}
          </Button>
        )}
        {isError && (
          <Button style={s.button} onPress={triggerError}>
            <WarningIcon isStart={isStart} />
          </Button>
        )}
      </Animated.View>
      {isError && (
        <Animated.Text style={[s.warningText, { transform: [{ translateX }] }]}>
          {warningText}
        </Animated.Text>
      )}
    </View>
  );
};

export default TextField;
