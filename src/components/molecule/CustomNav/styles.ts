import { StyleSheet } from "react-native";
import { widthPercent } from "../../../config";

const styles = () =>
  StyleSheet.create({
    specialButtonCont: {
      width: 64,
      height: 64,
      borderRadius: 64,
      backgroundColor: "yellow",
      alignItems: "center",
      justifyContent: "center",
      top: -8,
    },
    buttonCont: {
      width: 48,
      height: 48,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      width: widthPercent(100),
      height: 72,
      position: "absolute",
      bottom: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    image: { width: "200%", height: "200%" },
  });

export default styles;
