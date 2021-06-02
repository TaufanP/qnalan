interface RoomChatsPropsKey {
  [key: string]: RoomChatProps;
}

interface UsersProps {
  photoURL: string;
  displayName: string;
  uid: string;
  email: string;
  bio: string;
  roomChats?: RoomChatsPropsKey;
}

interface RoomChatProps {
  partnerId: string;
  roomId: string;
}

export type { UsersProps, RoomChatProps };
