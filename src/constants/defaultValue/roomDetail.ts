import { RoomDetailProps } from "../../config/types";

const RoomDetailValue: RoomDetailProps = {
  lastMessage: { createdAt: "", text: "" },
  messageId: "",
  participants: {
    firstUserUid: { isTyping: false, isRead: true },
    secondUserUid: { isTyping: false, isRead: true },
  },
};

export { RoomDetailValue };
