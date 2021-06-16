import { StyleSheet } from "react-native";
import { colorsPalette as cp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    excla: { fontWeight: "800", color: "#FFF" },
    container: {
      backgroundColor: cp.red1,
      width: 24,
      height: 24,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default styles;
