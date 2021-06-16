import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { colorsPalette as cp } from "../../constants";

interface WarningIconProps {
  isStart?: boolean;
}

const WarningIcon: FC<WarningIconProps> = ({ isStart = false }) => {
  const scale = new Animated.Value(1);
  const scalling = (toValue: number) =>
    Animated.timing(scale, {
      toValue,
      duration: 100,
      useNativeDriver: true,
    });
  const animate = () => {
    Animated.loop(Animated.sequence([scalling(1.2), scalling(1)]), {
      iterations: 2,
    }).start();
  };
  useEffect(() => {
    animate();
  }, [isStart]);
  const s = styles();
  return (
    <Animated.View style={[s.container, { transform: [{ scale }] }]}>
      <Text style={s.excla}>!</Text>
    </Animated.View>
  );
};

export default WarningIcon;

const styles = () =>
  StyleSheet.create({
    excla: { fontWeight: "800", color: "#FFF" },
    container: {
      backgroundColor: cp.red1,
      width: 24,
      height: 24,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
    },
  });
