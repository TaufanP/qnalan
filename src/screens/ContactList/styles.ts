import { StyleSheet } from "react-native";
import { heightPercent, widthPercent } from "../../config";
import { colorsPalette as cp, spacing as sp } from "../../constants";

const styles = () =>
  StyleSheet.create({
    contentContainerStyle: { marginTop: sp.sm, paddingBottom: sp.xxl },
    scrollContainerStyle: {
      backgroundColor: cp.white,
      borderRadius: 20,
    },
    scrollContentContainerStyle: {
      padding: 16,
      backgroundColor: cp.white,
    },
    sliderStyle: { marginBottom: sp.sm, marginTop: sp.sm },
    overlayCont: {
      position: "absolute",
      width: widthPercent(100),
      height: heightPercent(100),
      backgroundColor: "#0005",
    },
    filterButtonCont: { marginTop: sp.sm, marginLeft: sp.sm },
    scrollCont: { width: "100%" },
    togglerCont: { marginTop: 0 },
    scrollButton: {
      height: 50,
      backgroundColor: cp.blue3,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: sp.sm,
      borderRadius: 8,
    },
  });

export default styles;
