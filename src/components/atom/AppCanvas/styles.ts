import { StyleSheet } from "react-native";
import { colorsPalette as cp } from "../../../constants";

const multiplier = 1;

const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: cp.white,
      flex: multiplier,
      width: `${multiplier * 100}%`,
    },
  });

export default styles;
