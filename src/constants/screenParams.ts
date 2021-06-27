import { RoomChatParams, RoomListParams } from "../config/types";

type StackParamsList = {
  AUTH_SCREEN: { isRegister: boolean };
  ROOM_CHAT_SCREEN: RoomChatParams;
  ROOM_LIST: RoomListParams;
};

export default StackParamsList;
