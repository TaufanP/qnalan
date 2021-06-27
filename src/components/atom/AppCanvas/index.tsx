import { CompositeNavigationProp } from "@react-navigation/core";
import React, {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
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
  const [overlayState, setOverlayState] = useState<OverlayNotifTypes>({
    visible: false,
    onClose: () => console.log("overlayClosed"),
  });
  const [overlayNotifVisible, setOverlayNotifVisible] =
    useState<boolean>(false);
  const s = styles();

  const overlayNotifClose = useCallback(() => {
    setOverlayNotifVisible(false);
  }, [overlayNotifVisible]);

  const onMessageHandler = (notif: any) => {
    setOverlayNotifVisible(true);
  };

  useEffect(() => {
    messaging().onMessage(onMessageHandler);
  }, []);

  return (
    <View style={s.container}>
      <StatusBar backgroundColor={cp.blue4} barStyle="light-content" />
      {overlayNotifVisible && (
        <OverlayNotif
          {...{ visible: overlayNotifVisible, onClose: overlayNotifClose }}
        />
      )}
      {header && <AppHeader>{header()}</AppHeader>}
      {children}
      <FancyBar {...{ fancyBarState, setFancyBarState }} />
      <StaticBottomSheet {...(staticBottomSheetState || { visible: false })} />
    </View>
  );
};

export default AppCanvas;
