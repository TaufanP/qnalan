import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import Button from "./Button";
import WarningIcon from "./WarningIcon";

interface StyleProps {
  sideIcon?: boolean;
  isError?: boolean | string;
}

interface TextFieldProps {
  navigation?: CompositeNavigationProp<any, any>;
  containerStyle?: ViewStyle;
  fieldStyle?: TextStyle;
  sideIcon?: boolean;
  warningText?: string | boolean;
  isError?: boolean | string;
  securePress?: any;
  isStart?: boolean;
  renderSideIcon?: () => JSX.Element;
}

const TextField: FC<TextFieldProps & TextInputProps> = ({
  containerStyle,
  fieldStyle,
  sideIcon = false,
  warningText = "Username fennarex tidak tersedia",
  isError = false,
  securePress,
  isStart,
  renderSideIcon,
  ...props
}) => {
  const s = styles({ sideIcon, isError });
  // const renderIcon = renderSideIcon
  //   ? renderSideIcon
  //   : () => <>{props.secureTextEntry ? <EyeClose /> : <EyeOpen />}</>;

  const translateX = new Animated.Value(0);
  const translateDistance = 4;
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
    <View style={containerStyle}>
      <Animated.View style={s.container}>
        <TextInput style={[s.input, fieldStyle]} {...props} />
        {/* {sideIcon && (
          <Button style={s.button} onPress={securePress}>
            {renderIcon()}
          </Button>
        )} */}
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

const styles = ({ sideIcon, isError }: StyleProps) =>
  StyleSheet.create({
    warningText: {
      marginLeft: 4,
      color: cp.yellow1,
      fontSize: 12,
      fontWeight: "bold",
    },
    button: {
      width: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      fontWeight: "normal",
      flex: 1,
    },
    container: {
      backgroundColor: cp.white2,
      borderRadius: 8,
      paddingLeft: sp.sm,
      paddingRight: sideIcon || isError ? 0 : sp.sm,
      flexDirection: "row",
    },
  });
