import { StyleSheet } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: cp.blue3,
      height: 54,
      width: 54,
      borderRadius: 54,
      position: "absolute",
      bottom: sp.xl,
      right: sp.xl,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default styles;
