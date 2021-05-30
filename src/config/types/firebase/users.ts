interface UsersProps {
  photoURL: string;
  displayName: string;
  uid: string;
  email: string;
}

interface RoomChatProps {
  partnerId: string;
  roomId: string;
}

export type { UsersProps, RoomChatProps };