import { Dimensions, StyleSheet } from "react-native";
import { colorsPalette as cp, fancyStates as fan } from "../../../constants";

const { width } = Dimensions.get("screen");
const { fancyType } = fan;

interface StyleProps {
  bottomContainer: any;
  state: string;
}

const styles = ({ bottomContainer, state }: StyleProps) =>
  StyleSheet.create({
    container: {
      width: width - 32,
      left: 16,
      height: 50,
      bottom: -50,
      position: "absolute",
      backgroundColor:
        state == fancyType.success
          ? cp.green1
          : state == fancyType.warning
          ? "yellow"
          : cp.red1,
      borderRadius: 8,
      transform: [{ translateY: bottomContainer }],
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
  });

export default styles;
