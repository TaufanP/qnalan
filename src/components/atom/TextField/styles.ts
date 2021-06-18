import { StyleSheet } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../../constants";

interface StyleProps {
  isError?: boolean | string;
  sideIcon?: boolean;
  withPadding?: boolean;
}

const styles = ({ sideIcon, isError, withPadding }: StyleProps) =>
  StyleSheet.create({
    warningText: {
      marginLeft: 4,
      color: cp.red1,
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
      color: cp.text1,
    },
    container: {
      backgroundColor: cp.white2,
      borderRadius: 8,
      paddingLeft: withPadding ? sp.sm : 0,
      paddingRight: sideIcon || isError ? 0 : sp.sm,
      flexDirection: "row",
    },
  });

export default styles;
