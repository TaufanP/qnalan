import { ReactNode } from "react";

interface RoomChatParams {
  partnerId: string;
  messageId: string;
  roomId: string;
}

interface StaticBottomSheetProps {
  onPressLeft?: any;
  onPressRight?: any;
  onPress?: any;
  visible: boolean;
  action?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  mainLabel?: string;
  mainTitle?: string;
  subTitle?: string;
  setVisible?: Function;
  mainIcon?: ReactNode;
  customComp?: () => JSX.Element;
}

export type { RoomChatParams, StaticBottomSheetProps };
