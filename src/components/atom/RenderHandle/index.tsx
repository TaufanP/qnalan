import React, { FC } from "react";
import { View } from "react-native";
import styles from "./styles";

interface LoadingButtonProps {
  color?: string;
}

const RenderHandle: FC<LoadingButtonProps> = () => {
  const s = styles();
  return (
    <View style={s.container}>
      <View style={s.handler} />
    </View>
  );
};

export default RenderHandle;
