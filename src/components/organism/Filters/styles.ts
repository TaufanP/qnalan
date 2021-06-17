import { StyleSheet } from "react-native";
import { spacing as sp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    container: {
      height: 36,
      marginVertical: sp.sm,
      flexDirection: "row",
      paddingHorizontal: sp.sm,
    },
  });

export default styles;
