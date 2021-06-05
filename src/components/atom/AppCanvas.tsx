import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { colorsPalette as cp } from "../../constants";
import FancyBar from "./FancyBar";
import { FancyTypes, StaticBottomSheetProps } from "../../config/types";
import AppHeader from "./AppHeader";
import StaticBottomSheet from "../organism/StaticBottomSheet";
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
