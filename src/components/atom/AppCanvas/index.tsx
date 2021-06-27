import { CompositeNavigationProp } from "@react-navigation/core";
import React, { PropsWithChildren, ReactNode, useEffect } from "react";
import { StatusBar, View } from "react-native";
import {
  FancyTypes,
  OverlayNotifTypes,
  StaticBottomSheetProps,
} from "../../../config/types";
import { colorsPalette as cp } from "../../../constants";
import StaticBottomSheet from "../../organism/StaticBottomSheet";
import AppHeader from "../AppHeader";
import FancyBar from "../FancyBar";
import OverlayNotif from "../OverlayNotif";
import styles from "./styles";
import messaging from "@react-native-firebase/messaging";

interface AppCanvasProps {
  overlayNotifState?: OverlayNotifTypes;
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
  overlayNotifState = {
    visible: false,
    onClose: () => console.log("overlayClosed"),
  },
}: PropsWithChildren<AppCanvasProps>) => {
  const s = styles();

  useEffect(() => {
    messaging().onMessage((e) => console.log(e));
  }, []);

  return (
    <View style={s.container}>
      <StatusBar backgroundColor={cp.blue4} barStyle="light-content" />
      {overlayNotifState?.visible && <OverlayNotif {...overlayNotifState} />}
      {header && <AppHeader>{header()}</AppHeader>}
      {children}
      <FancyBar {...{ fancyBarState, setFancyBarState }} />
      <StaticBottomSheet {...(staticBottomSheetState || { visible: false })} />
    </View>
  );
};

export default AppCanvas;
