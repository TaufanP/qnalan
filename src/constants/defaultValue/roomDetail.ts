import { RoomDetailProps } from "../../config/types";

const RoomDetailValue: RoomDetailProps = {
  lastMessage: "",
  messageId: "",
  participants: {
    firstUserUid: { isTyping: false },
    secondUserUid: { isTyping: false },
  },
};

export { RoomDetailValue };
