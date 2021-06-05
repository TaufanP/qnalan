interface RoomChatsPropsKey {
  [key: string]: RoomChatProps;
}

interface HobbyProps {
  id: number;
  label: string;
  isSelected: boolean;
}
interface UsersProps {
  bio: string;
  displayName: string;
  dob: string;
  gender: number;
  hobbies: HobbyProps[];
  email: string;
  photoURL: string;
  uid: string;
  roomChats?: RoomChatsPropsKey;
}

interface RoomChatProps {
  partnerId: string;
  roomId: string;
}

export type { UsersProps, RoomChatProps, HobbyProps };
