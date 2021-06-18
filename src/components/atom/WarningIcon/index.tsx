import React, { useEffect } from "react";
import { Animated, Text } from "react-native";
import styles from "./styles";

interface WarningIconProps {
  isStart?: boolean;
}

const WarningIcon = ({ isStart = false }: WarningIconProps) => {
  const s = styles();
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

  return (
    <Animated.View style={[s.container, { transform: [{ scale }] }]}>
      <Text style={s.excla}>!</Text>
    </Animated.View>
  );
};

export default WarningIcon;
