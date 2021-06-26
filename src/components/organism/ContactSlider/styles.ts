import { StyleSheet } from "react-native";

const THUMB_RADIUS = 12;

const styles = StyleSheet.create({
  labelTextStyle: {
    fontSize: 16,
    color: "#fff",
  },
  labelStyle: {
    alignItems: "center",
    padding: 8,
    backgroundColor: "#4499ff",
    borderRadius: 4,
  },
  railSelectedStyle: {
    height: 4,
    backgroundColor: "#4499ff",
    borderRadius: 2,
  },
  railStyle: {
    width: "100%",
    height: 4,
    borderRadius: 2,
    backgroundColor: "#7f7f7f",
  },
  thumbStyle: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: "#7f7f7f",
    backgroundColor: "#ffffff",
  },
  notchStyle: {
    width: 8,
    height: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#4499ff",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});

export default styles;
