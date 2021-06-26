import React from "react";
import { View } from "react-native";
import styles from "./styles";

const RenderHandle = () => {
  const s = styles();
  return (
    <View style={s.container}>
      <View style={s.handler} />
    </View>
  );
};

export default RenderHandle;
