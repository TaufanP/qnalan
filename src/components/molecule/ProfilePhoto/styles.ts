import { StyleSheet } from "react-native";
import { widthPercent } from "../../../config";
import { colorsPalette as cp, spacing as sp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    imageCont: {
      justifyContent: "center",
      alignItems: "center",
      width: widthPercent(30),
      height: widthPercent(30),
      borderRadius: widthPercent(30),
      borderColor: cp.main,
      marginBottom: sp.l,
      overflow: "hidden",
    },
    image: { width: "100%", height: "100%" },
  });

export default styles;
