import { StyleSheet } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../../constants";

const size = 54;

const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: cp.blue3,
      height: size,
      width: size,
      borderRadius: size,
      position: "absolute",
      bottom: sp.xl,
      right: sp.xl,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default styles;
