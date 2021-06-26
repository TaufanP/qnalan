import { StyleSheet } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../../constants";

const mainSize = 20;
const childSize = 12;

const styles = () =>
  StyleSheet.create({
    inner: {
      width: childSize,
      height: childSize,
      borderRadius: childSize,
      backgroundColor: cp.blue3,
    },
    outer: {
      width: mainSize,
      height: mainSize,
      borderRadius: mainSize,
      borderColor: cp.blue3,
      borderWidth: 2,
      marginRight: sp.ss,
      justifyContent: "center",
      alignItems: "center",
    },
    childCont: {
      flexDirection: "row",
      marginRight: sp.xxxl,
    },
    container: { flexDirection: "row", marginVertical: sp.sm },
  });

export default styles;
