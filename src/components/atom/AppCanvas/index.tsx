import messaging from "@react-native-firebase/messaging";
import { CompositeNavigationProp } from "@react-navigation/core";
import React, {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
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
import PersonList from "../../molecule/PersonList";

interface AppCanvasProps {
  fancyBarState?: FancyTypes;
  header?: () => ReactNode;
  navigation?: CompositeNavigationProp<any, any>;
  setFancyBarState?: any;
  staticBottomSheetState?: StaticBottomSheetProps;
  currentScreen?: string;
  extraData?: string;
}

interface ChatNotifProps {
  uri: string;
  title: string;
  subtitle: string;
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
  const isMounted = useRef(true);

  const [overlayNotifVisible, setOverlayNotifVisible] =
    useState<boolean>(false);

  const [chatNotif, setChatNotif] = useState<ChatNotifProps>({
    uri: "",
    title: "",
    subtitle: "",
  });

  const s = styles();

  const overlayNotifClose = useCallback(() => {
    if (isMounted.current) setOverlayNotifVisible(false);
  }, [overlayNotifVisible]);

  const onMessageHandler = (notif: any) => {
    const isNotifVisible: boolean =
      currentScreen == p.RoomChat
        ? !notif?.data?.linking?.includes(extraData)
        : true;
    const { body, title, uri, partnerId, roomId, messageId } = notif?.data;
    if (isMounted.current) {
      setChatNotif({
        title: title || "",
        uri: uri || "",
        subtitle: body || "",
      });
      setOverlayNotifVisible(isNotifVisible);
    }
  };

  useEffect(() => {
    messaging().onMessage(onMessageHandler);

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <View style={s.container}>
      <StatusBar backgroundColor={cp.blue4} barStyle="light-content" />
      {overlayNotifVisible && (
        <OverlayNotif
          {...{ visible: overlayNotifVisible, onClose: overlayNotifClose }}
        >
          <PersonList
            {...{
              onPress: () => console.log("test"),
              titleBold: false,
              style: { marginBottom: 0 },
              imageSize: 32,
              ...chatNotif,
            }}
          />
        </OverlayNotif>
      )}
      {header && <AppHeader>{header()}</AppHeader>}
      {children}
      <FancyBar {...{ fancyBarState, setFancyBarState }} />
      <StaticBottomSheet {...(staticBottomSheetState || { visible: false })} />
    </View>
  );
};

export default AppCanvas;
