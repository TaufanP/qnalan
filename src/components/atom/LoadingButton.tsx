import React, { FC, useEffect } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("screen");

interface StyleProps {
  color?: string;
}

interface LoadingButtonProps {
  color?: string;
}

const LoadingButton: FC<LoadingButtonProps> = ({ color = "#FFF" }) => {
  const s = styles({ color });
  const firstDot = new Animated.Value(0);
  const secondDot = new Animated.Value(0);
  const thirdDot = new Animated.Value(0);
  const upValue = -4;
  const baseDuration = 200;
  const animationMove = () => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(firstDot, {
            toValue: upValue,
            useNativeDriver: true,
            duration: baseDuration,
          }),
          Animated.timing(firstDot, {
            toValue: 0,
            useNativeDriver: true,
            duration: baseDuration,
          }),
        ]),
        Animated.sequence([
          Animated.timing(secondDot, {
            delay: baseDuration / 2,
            toValue: upValue,
            useNativeDriver: true,
            duration: baseDuration,
          }),
          Animated.timing(secondDot, {
            toValue: 0,
            useNativeDriver: true,
            duration: baseDuration,
          }),
        ]),
        Animated.sequence([
          Animated.timing(thirdDot, {
            delay: (baseDuration * 2) / 2,
            toValue: upValue,
            useNativeDriver: true,
            duration: baseDuration,
          }),
          Animated.timing(thirdDot, {
            toValue: 0,
            useNativeDriver: true,
            duration: baseDuration,
          }),
        ]),
      ])
    ).start();
  };

  useEffect(() => {
    animationMove();
  }, []);

  return (
    <View style={s.container}>
      <Animated.View
        style={[s.button, { transform: [{ translateY: firstDot }] }]}
      />
      <Animated.View
        style={[s.button, { transform: [{ translateY: secondDot }] }]}
      />
      <Animated.View
        style={[s.button, { marginRight: 0, translateY: thirdDot }]}
      />
    </View>
  );
};

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

export default LoadingButton;
