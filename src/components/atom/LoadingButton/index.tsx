import React, { useEffect } from "react";
import { Animated, View } from "react-native";
import { colorsPalette as cp } from "../../../constants";
import styles from "./styles";

interface LoadingButtonProps {
  color?: string;
}

const upValue = -4;
const baseDuration = 200;

const animator = (
  animation: Animated.Value,
  isIn: boolean = true,
  delay?: number
) =>
  Animated.timing(animation, {
    toValue: isIn ? upValue : 0,
    useNativeDriver: true,
    duration: baseDuration,
    delay,
  });

const LoadingButton = ({ color = cp.white }: LoadingButtonProps) => {
  const s = styles({ color });
  const firstDot = new Animated.Value(0);
  const secondDot = new Animated.Value(0);
  const thirdDot = new Animated.Value(0);

  const firstMove = [animator(firstDot), animator(firstDot, false)];
  const secondMove = [
    animator(secondDot, true, baseDuration / 2),
    animator(secondDot, false),
  ];
  const thirdMove = [
    animator(thirdDot, true, (baseDuration * 2) / 2),
    animator(thirdDot, false),
  ];

  const animationMove = () => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence(firstMove),
        Animated.sequence(secondMove),
        Animated.sequence(thirdMove),
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

export default LoadingButton;
