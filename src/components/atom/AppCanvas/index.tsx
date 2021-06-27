import messaging from "@react-native-firebase/messaging";
import { CompositeNavigationProp } from "@react-navigation/core";
import React, {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { StatusBar, View } from "react-native";
import { FancyTypes, StaticBottomSheetProps } from "../../../config/types";
import { colorsPalette as cp, pages as p } from "../../../constants";
import StaticBottomSheet from "../../organism/StaticBottomSheet";
import AppHeader from "../AppHeader";
import FancyBar from "../FancyBar";
import OverlayNotif from "../OverlayNotif";
import styles from "./styles";

interface AppCanvasProps {
  fancyBarState?: FancyTypes;
  header?: () => ReactNode;
  navigation?: CompositeNavigationProp<any, any>;
  setFancyBarState?: any;
  staticBottomSheetState?: StaticBottomSheetProps;
  currentScreen?: string;
  extraData?: string;
}

const AppCanvas = ({
  children,
  fancyBarState,
  header,
  setFancyBarState,
  staticBottomSheetState,
  currentScreen = "",
  extraData = "",
}: PropsWithChildren<AppCanvasProps>) => {
  const [overlayNotifVisible, setOverlayNotifVisible] =
    useState<boolean>(false);

  const s = styles();

  const overlayNotifClose = useCallback(() => {
    setOverlayNotifVisible(false);
  }, [overlayNotifVisible]);

  const onMessageHandler = (notif: any) => {
    const isNotifVisible: boolean =
      currentScreen == p.RoomChat
        ? !notif?.data?.linking?.includes(extraData)
        : true;
    setOverlayNotifVisible(isNotifVisible);
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
