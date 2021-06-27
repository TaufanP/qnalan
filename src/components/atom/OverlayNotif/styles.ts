import { StyleSheet } from "react-native";
import { widthPercent } from "../../../config/units";
import { colorsPalette as cp, spacing as sp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    container: {
      width: widthPercent(100),
      height: 56,
      position: "absolute",
      top: sp.l,
      alignItems: "center",
      zIndex: 2,
    },
    childCont: {
      width: "85%",
      height: 56,
      backgroundColor: cp.white,
      borderRadius: 8,
      elevation: 4,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default styles;
