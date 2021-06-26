import { CompositeNavigationProp } from "@react-navigation/core";
import React, { PropsWithChildren, ReactNode } from "react";
import { StatusBar, View } from "react-native";
import { FancyTypes, StaticBottomSheetProps } from "../../../config/types";
import { colorsPalette as cp } from "../../../constants";
import StaticBottomSheet from "../../organism/StaticBottomSheet";
import AppHeader from "../AppHeader";
import FancyBar from "../FancyBar";
import styles from "./styles";

interface AppCanvasProps {
  fancyBarState?: FancyTypes;
  header?: () => ReactNode;
  navigation?: CompositeNavigationProp<any, any>;
  setFancyBarState?: any;
  staticBottomSheetState?: StaticBottomSheetProps;
}

const AppCanvas = ({
  children,
  fancyBarState,
  header,
  setFancyBarState,
  staticBottomSheetState,
}: PropsWithChildren<AppCanvasProps>) => {
  const s = styles();
  return (
    <View style={s.container}>
      <StatusBar backgroundColor={cp.blue4} barStyle="light-content" />
      {header && <AppHeader>{header()}</AppHeader>}
      {children}
      <FancyBar {...{ fancyBarState, setFancyBarState }} />
      <StaticBottomSheet {...(staticBottomSheetState || { visible: false })} />
    </View>
  );
};

export default AppCanvas;
