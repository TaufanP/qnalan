import { StyleSheet } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../constants";

const styles = () =>
  StyleSheet.create({
    customTextField: {
      height: 50,
      justifyContent: "center",
      paddingLeft: sp.ss,
      borderLeftWidth: 2,
      borderLeftColor: "transparent",
      marginBottom: sp.sm,
    },
    scroll: {
      // justifyContent: "center",
      // alignItems: "center",
      marginTop: sp.l,
      paddingBottom: 64,
      paddingHorizontal: sp.l,
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: cp.blue3,
      borderRadius: 8,
      height: 48,
      marginTop: sp.l,
    },
    field: {
      backgroundColor: "transparent",
      borderBottomWidth: 2,
      borderBottomColor: cp.blue1,
    },
  });

export default styles;
