import { StyleSheet } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    countText: { fontSize: 11, color: cp.white, top: -1, left: -1 },
    counterCont: {
      borderWidth: 1,
      borderColor: cp.blue3,
      backgroundColor: cp.blue3,
      marginRight: 8,
      borderRadius: 4,
      width: 16,
      height: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      alignSelf: "flex-start",
      flexDirection: "row",
      paddingHorizontal: 8,
      borderColor: cp.blue3,
      borderWidth: 1,
      alignItems: "center",
      borderRadius: 8,
      paddingVertical: 4,
      marginRight: sp.sm,
      marginBottom: sp.ss,
      backgroundColor: "transparent",
    },
  });

export default styles;
