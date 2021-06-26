import { StyleSheet } from "react-native";
import { colorsPalette as cp, spacing as sp } from "../../../constants";

const styles = ({ isSelected }: { isSelected: boolean }) =>
  StyleSheet.create({
    childCont: {
      flexDirection: "row",
      marginRight: sp.ss,
      marginVertical: sp.ss,
      borderWidth: 1,
      borderColor: cp.blue3,
      paddingHorizontal: sp.sm,
      paddingVertical: sp.ss,
      borderRadius: 8,
      backgroundColor: isSelected ? cp.blue3 : "transparent",
    },
  });

export default styles;
