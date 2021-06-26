import { StyleSheet, ViewStyle } from "react-native";
import { spacing as sp } from "../../../constants";

const styles = () => {
  const centering: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
  };

  return StyleSheet.create({
    iconCont: {
      marginBottom: sp.sm,
      ...centering,
    },
    container: {
      flex: 1,
      ...centering,
    },
  });
};
export default styles;
