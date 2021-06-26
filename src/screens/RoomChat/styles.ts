import { StyleSheet } from "react-native";
import { spacing as sp } from "../../constants";

const styles = () =>
  StyleSheet.create({
    avatarImage: { width: "100%", height: "100%" },

    headerStyle: { flex: 1, justifyContent: "center" },

    renderAvatarStyle: {
      width: 32,
      height: 32,
      borderRadius: 32,
      overflow: "hidden",
    },
    renderComposerStyle: {
      color: "#222B45",
      backgroundColor: "#EDF1F7",
      borderRadius: 400,
      paddingHorizontal: 12,
    },
    renderInputStyle: { backgroundColor: "#fff" },
    renderSendStyle: {
      paddingHorizontal: sp.sm,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default styles;
