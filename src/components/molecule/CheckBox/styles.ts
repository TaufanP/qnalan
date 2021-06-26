import { StyleSheet } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../../constants";

const mainSize = 20;
const childSize = 12;

const styles = () =>
  StyleSheet.create({
    inner: {
      width: childSize,
      height: childSize,
      backgroundColor: cp.blue3,
    },
    outer: {
      width: mainSize,
      height: mainSize,
      borderColor: cp.blue3,
      borderWidth: 2,
      marginRight: sp.ss,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      flexDirection: "row",
      marginRight: sp.sm,
      alignItems: "center",
      marginBottom: sp.sm,
    },
  });

export default styles;
