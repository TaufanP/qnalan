interface TypingProps {
  isTyping: boolean;
}

interface ParticipantProps {
  [key: string]: TypingProps;
}

interface LastMessageProps {
  text: string;
  createdAt: string | number;
}

interface RoomDetailProps {
  lastMessage: LastMessageProps;
  messageId: string;
  participants: ParticipantProps;
}

export type { RoomDetailProps };
