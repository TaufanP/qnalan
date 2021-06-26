import { StyleSheet, ViewStyle } from "react-native";
import { widthPercent as wp } from "../../../config/units";
import { colorsPalette as cp } from "../../../constants";

const relativeWidth = wp(80);
const fixedHeightRWRatio = relativeWidth * 0.1519;

const styles = () => {
  const center: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
  };
  const widthRelative: ViewStyle = {
    width: relativeWidth,
    height: fixedHeightRWRatio,
    borderRadius: fixedHeightRWRatio * 0.16,
    ...center,
  };
  return StyleSheet.create({
    center,
    widthRelativeColored: {
      backgroundColor: cp.blue3,
      ...widthRelative,
    },
    widthRelativeBordered: {
      borderWidth: 1,
      borderColor: cp.main,
      ...widthRelative,
    },
  });
};

export default styles;
