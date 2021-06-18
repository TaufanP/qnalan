import { StyleSheet } from "react-native";
import { colorsPalette as cp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    // COLOR
    defaultWhite: { color: cp.white },
    defaultMain: { color: cp.main },

    bigHeader: { fontSize: 40, color: cp.main },

    header: { fontWeight: "bold", fontSize: 18, color: cp.white },

    logo: { color: cp.main, fontSize: 24 },

    container: { flexDirection: "row", alignItems: "flex-end" },
    unitText: {
      color: cp.main,
    },
    default: {},

    warningText: {
      marginLeft: 4,
      color: cp.yellow1,
      fontSize: 12,
    },

    // ==============================
  });

export default styles;
