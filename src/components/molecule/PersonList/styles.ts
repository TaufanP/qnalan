import { StyleSheet } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    titleCont: { flexDirection: "row", justifyContent: "space-between" },
    photo: { width: "100%", height: "100%" },
    photoCont: {
      width: 48,
      height: 48,
      borderRadius: 48,
      borderColor: cp.white2,
      borderWidth: 1,
      marginRight: sp.sm,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    container: {
      flexDirection: "row",
      marginBottom: sp.sm,
      alignItems: "center",
      paddingHorizontal: sp.sm,
    },
  });

export default styles;
