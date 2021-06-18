import { Dimensions, StyleSheet } from "react-native";
import {
  colorsPalette as cp,
  fancyStates as fan,
  spacing as sp,
} from "../../../constants";

const { width } = Dimensions.get("screen");
const { fancyType } = fan;

interface StyleProps {
  bottomContainer: any;
  state: string;
}

const styles = ({ bottomContainer, state }: StyleProps) =>
  StyleSheet.create({
    button: { width: 50, marginLeft: 8 },

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

    msgText: { paddingLeft: sp.sm },
  });

export default styles;
