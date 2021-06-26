import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../../constants";

const { width, height } = Dimensions.get("screen");

const iconWidth = 168;

const styles = () => {
  const buttonBase: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  };
  return StyleSheet.create({
    actionButton: { ...buttonBase, backgroundColor: cp.blue3, height: 50 },
    titleCont: {
      width: iconWidth,
      height: iconWidth,
      justifyContent: "center",
      alignItems: "center",
    },
    subtitleText: {
      textAlign: "center",
      color: cp.text1,
      paddingHorizontal: sp.sm,
    },
    touchArea: { width: "100%", height: "100%" },
    blackBackground: {
      width,
      height,
      backgroundColor: "#0008",
      position: "absolute",
    },
    bgScreen: { width, height, backgroundColor: "#000" },
    buttonsCont: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: sp.sm,
    },
    buttonText: {
      fontSize: 20,
      textAlign: "center",
    },
    rightButton: {
      ...buttonBase,
      marginLeft: sp.ss,
      backgroundColor: cp.blue3,
    },
    leftButton: {
      ...buttonBase,
      borderColor: cp.blue3,
      marginRight: sp.ss,
      borderWidth: 1,
    },
    buttonCont: { flex: 1, height: 50 },
    titleText: {
      color: cp.text1,
      fontSize: 16,
      marginBottom: sp.ss,
      fontWeight: "bold",
    },
    imageGroup: {
      alignItems: "center",
      paddingHorizontal: sp.sm,
      marginBottom: 32,
    },
    closeCont: {
      elevation: 1,
      width: 24,
      height: 24,
      backgroundColor: cp.white0,
      borderRadius: 24,
      marginBottom: sp.ss,
      justifyContent: "center",
      alignItems: "center",
    },
    contentCont: {
      width,
      backgroundColor: cp.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingTop: sp.sm,
      paddingHorizontal: sp.sm,
      paddingBottom: sp.l,
    },
    emptyCont: {
      width,
      height,
      position: "absolute",
      justifyContent: "flex-end",
      bottom: 0,
    },
  });
};

export default styles;
