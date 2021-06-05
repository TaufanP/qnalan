import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { FancyTypes, StaticBottomSheetProps } from "../../config/types";
import { colorsPalette as cp } from "../../constants";
import StaticBottomSheet from "../organism/StaticBottomSheet";
import AppHeader from "./AppHeader";
import FancyBar from "./FancyBar";
interface AppCanvasProps {
  navigation?: CompositeNavigationProp<any, any>;
  fancyBarState?: FancyTypes;
  setFancyBarState?: any;
  header?: () => JSX.Element;
  staticBottomSheetState?: StaticBottomSheetProps;
}

const AppCanvas: FC<PropsWithChildren<AppCanvasProps>> = ({
  children,
  fancyBarState,
  setFancyBarState,
  header,
  staticBottomSheetState,
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      <StatusBar backgroundColor={"#449CDA"} barStyle="light-content" />
      {header && <AppHeader>{header()}</AppHeader>}
      {children}
      <FancyBar {...{ fancyBarState, setFancyBarState }} />
      <StaticBottomSheet {...(staticBottomSheetState || { visible: false })} />
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
