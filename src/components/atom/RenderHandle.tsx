import React, { FC, useEffect } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("screen");

interface StyleProps {
  color?: string;
}

interface LoadingButtonProps {
  color?: string;
}

const RenderHandle: FC<LoadingButtonProps> = ({ color = "#FFF" }) => {
  const s = styles({ color });
  return (
    <View style={s.container}>
      <View style={s.handler} />
    </View>
  );
};

const styles = ({ color }: StyleProps) =>
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

export default RenderHandle;
