import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { colorsPalette as cp } from "../../constants";
import FancyBar from "./FancyBar";
import { FancyTypes } from "../../config/types";
import AppHeader from "./AppHeader";
interface AppCanvasProps {
  navigation?: CompositeNavigationProp<any, any>;
  fancyBarState?: FancyTypes;
  setFancyBarState?: any;
  header?: () => JSX.Element;
}

const AppCanvas: FC<PropsWithChildren<AppCanvasProps>> = ({
  children,
  fancyBarState,
  setFancyBarState,
  header,
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      <StatusBar backgroundColor={cp.white} barStyle="dark-content" />
      {header && <AppHeader>{header()}</AppHeader>}
      {children}
      <FancyBar {...{ fancyBarState, setFancyBarState }} />
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
