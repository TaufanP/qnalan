import { StyleSheet } from "react-native";
import { widthPercent } from "../../../config";
import { colorsPalette as cp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    childCont: {
      width: widthPercent(12),
      height: widthPercent(12),
      marginRight: 8,
    },
    details: { justifyContent: "center" },
    image: { width: "100%", height: "100%" },
    imageCont: {
      width: "100%",
      height: "100%",
      overflow: "hidden",
      borderRadius: widthPercent(12),
      borderWidth: 1,
      borderColor: cp.white2,
    },
    container: {
      flexDirection: "row",
      paddingVertical: 12,
    },
  });

export default styles;
