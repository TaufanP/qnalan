import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { colorsPalette as cp } from "../../constants";
interface AppCanvasProps {
  navigation?: CompositeNavigationProp<any, any>;
}

const AppCanvas: FC<PropsWithChildren<AppCanvasProps>> = ({ children }) => {
  const s = styles();
  return (
    <View style={s.container}>
      <StatusBar backgroundColor={cp.white} barStyle="dark-content" />
      {children}
    </View>
  );
};

const multiplier = 1;

const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: cp.white1,
      flex: multiplier,
      width: `${multiplier * 100}%`,
    },
  });

export default AppCanvas;
