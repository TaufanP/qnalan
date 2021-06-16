import { StyleSheet } from "react-native";

interface StyleProps {
  color?: string;
}

const styles = ({ color }: StyleProps) =>
  StyleSheet.create({
    button: {
      width: 6,
      height: 6,
      backgroundColor: color,
      borderRadius: 6,
      marginRight: 6,
    },
    container: {
      flexDirection: "row",
    },
  });

export default styles;
