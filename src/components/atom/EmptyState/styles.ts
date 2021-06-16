import { StyleSheet } from "react-native";
import { spacing as sp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    iconCont: {
      marginBottom: sp.sm,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default styles;
