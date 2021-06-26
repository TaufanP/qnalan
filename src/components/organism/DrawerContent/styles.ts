import { StyleSheet } from "react-native";
import { spacing as sp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    buttonContainer: { paddingVertical: sp.s },
    drawerContentStyle: { paddingHorizontal: sp.sm },
    iconCont: { flexDirection: "row", alignItems: "center" },
    iconStyle: { marginRight: sp.m },
  });

export default styles;
