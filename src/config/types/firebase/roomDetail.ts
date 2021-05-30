interface TypingProps {
  isTyping: boolean;
}

interface ParticipantProps {
  [key: string]: TypingProps;
}

interface RoomDetailProps {
  lastMessage: string;
  messageId: string;
  participants: ParticipantProps;
}

export type { RoomDetailProps };
