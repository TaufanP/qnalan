import { StyleSheet } from "react-native";

interface StyleProps {
  color?: string;
}

const size = 6;

const styles = ({ color }: StyleProps) =>
  StyleSheet.create({
    button: {
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size,
      marginRight: size,
    },
    container: {
      flexDirection: "row",
    },
  });

export default styles;
