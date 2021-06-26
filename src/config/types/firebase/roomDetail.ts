interface TypingProps {
  isTyping: boolean;
  isRead: boolean;
}

interface ParticipantProps {
  [key: string]: TypingProps;
}

interface LastMessageProps {
  createdAt: string | number;
  text: string;
}

interface RoomDetailProps {
  lastMessage: LastMessageProps;
  messageId: string;
  participants: ParticipantProps;
}

export type { RoomDetailProps };
