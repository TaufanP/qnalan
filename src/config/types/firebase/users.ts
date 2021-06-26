interface RoomChatsPropsKey {
  [key: string]: RoomChatProps;
}

interface HobbyProps {
  id: number;
  isSelected: boolean;
  label: string;
}
interface UsersProps {
  batch: string;
  bio: string;
  displayName: string;
  dob: string;
  email: string;
  gender: number;
  hobbies: HobbyProps[];
  major: string;
  photoURL: string;
  uid: string;
  roomChats?: RoomChatsPropsKey;
  token?: string;
}

interface RoomChatProps {
  partnerId: string;
  roomId: string;
  createdAt: string;
}

export type { UsersProps, RoomChatProps, HobbyProps };
