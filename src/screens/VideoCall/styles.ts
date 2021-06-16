import { StyleSheet, ViewStyle } from "react-native";
import { widthPercent } from "../../config";
import { colorsPalette as cp, spacing as sp } from "../../constants";

const styles = () => {
  const base = 54;
  const baseButton: ViewStyle = {
    width: base,
    height: base,
    borderRadius: base,
    justifyContent: "center",
    alignItems: "center",
  };
  return StyleSheet.create({
    imageProfile: { width: "100%", height: "100%" },
    ownVideoCont: {
      position: "absolute",
      width: widthPercent(30),
      height: (widthPercent(30) * 4) / 3,
      backgroundColor: "red",
      right: sp.sm,
      top: sp.sm,
    },
    swapButton: { ...baseButton, backgroundColor: "#0005" },
    closeButton: { ...baseButton, backgroundColor: cp.red1 },
    buttonsCont: {
      height: base,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      bottom: sp.l,
      width: widthPercent(100),
      flexDirection: "row",
    },
    backCont: {
      backgroundColor: "#0005",
      top: sp.sm,
      left: sp.sm,
      position: "absolute",
      borderRadius: 8,
    },
    cameraCont: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
  });
};

export default styles;
