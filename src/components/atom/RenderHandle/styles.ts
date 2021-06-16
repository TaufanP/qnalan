import { StyleSheet } from "react-native";

const styles = () =>
  StyleSheet.create({
    handler: {
      width: 40,
      height: 2,
      backgroundColor: "rgba(0,0,0,0.3)",
      borderRadius: 4,
    },
    container: {
      alignItems: "center",
      backgroundColor: "white",
      paddingVertical: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  });

export default styles;
