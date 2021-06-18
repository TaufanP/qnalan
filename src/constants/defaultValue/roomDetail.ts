import { RoomDetailProps } from "../../config/types";

const RoomDetailValue: RoomDetailProps = {
  lastMessage: { createdAt: "", text: "" },
  messageId: "",
  participants: {
    firstUserUid: { isTyping: false },
    secondUserUid: { isTyping: false },
  },
};

export { RoomDetailValue };
