import { ReactNode } from "react";

interface FilterDataProps {
  count: number;
  label: string;
  value: number;
}
interface RoomChatParams {
  messageId: string;
  partnerId: string;
  roomId: string;
}

interface StaticBottomSheetProps {
  action?: boolean;
  leftLabel?: string;
  mainIcon?: ReactNode;
  mainLabel?: string;
  mainTitle?: string;
  onPress?: any;
  onPressLeft?: any;
  onPressRight?: any;
  subTitle?: string;
  rightLabel?: string;
  visible: boolean;

  customComp?: () => JSX.Element;
  setVisible?: Function;
}

export type { RoomChatParams, StaticBottomSheetProps, FilterDataProps };
