import { StyleSheet, ViewStyle } from "react-native";
import { widthPercent, widthPercent as wp } from "../../../config/units";
import { colorsPalette as cp, spacing as sp } from "../../../constants";

const relativeWidth = wp(80);
const fixedHeightRWRatio = relativeWidth * 0.1519;

const styles = () =>
  StyleSheet.create({
    container: {
      width: widthPercent(100),
      height: 72,
      position: "absolute",
      top: sp.l,
      alignItems: "center",
      zIndex: 2,
    },
    childCont: {
      width: "85%",
      height: 64,
      backgroundColor: cp.white,
      borderRadius: 8,
      elevation: 4,
    },
  });

export default styles;
