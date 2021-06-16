import { StyleSheet } from "react-native";
import { colorsPalette as cp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    // UNIT

    // TEXT
    bold12Main: { fontWeight: "bold", fontSize: 12, color: cp.main },
    bold14White: { fontWeight: "bold", fontSize: 14, color: cp.white },
    bold14Blue3: { fontWeight: "bold", fontSize: 14, color: cp.blue3 },
    bold14Main: { fontWeight: "bold", fontSize: 14, color: cp.main },
    bold14Text1: { fontWeight: "bold", fontSize: 14, color: cp.text1 },
    bold16White: { fontWeight: "bold", fontSize: 16, color: cp.white },
    bold18White: { fontWeight: "bold", fontSize: 18, color: cp.white },
    bold20Text1: { fontWeight: "bold", fontSize: 20, color: cp.text1 },
    bold20White: { fontWeight: "bold", fontSize: 20, color: cp.white },
    bold24White: { fontWeight: "bold", fontSize: 24, color: cp.white },
    bold24Main: { fontWeight: "bold", fontSize: 24, color: cp.main },

    normal12Main: { fontWeight: "normal", fontSize: 12, color: cp.main },
    normal12Text3: { fontWeight: "normal", fontSize: 14, color: cp.text3 },
    normal12Text1: { fontWeight: "normal", fontSize: 12, color: cp.text1 },
    normal12White: { fontWeight: "normal", fontSize: 12, color: cp.white },
    normal14Blue3: { fontWeight: "normal", fontSize: 14, color: cp.blue3 },
    normal14Main: { fontWeight: "normal", fontSize: 14, color: cp.main },
    normal14Red1: { fontWeight: "normal", fontSize: 14, color: cp.red1 },
    normal14White: { fontWeight: "normal", fontSize: 14, color: cp.white },
    normal14Text1Italic: {
      fontWeight: "normal",
      fontSize: 14,
      color: cp.text1,
      fontStyle: "italic",
    },
    normal14Text1: { fontWeight: "normal", fontSize: 14, color: cp.text1 },
    normal20White: { fontWeight: "normal", fontSize: 20, color: cp.white },
    normal24Main: { fontWeight: "normal", fontSize: 20, color: cp.main },

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
