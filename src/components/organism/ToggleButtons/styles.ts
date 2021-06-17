import { StyleSheet } from "react-native";
import { spacing as sp } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    childCont: {
      flexDirection: "row",
      marginRight: sp.xxxl,
    },
    container: {
      flexDirection: "row",
      marginVertical: sp.sm,
      flexWrap: "wrap",
    },
  });

export default styles;
