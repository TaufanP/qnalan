interface RoomChatsPropsKey {
  [key: string]: RoomChatProps;
}

interface HobbyProps {
  id: number;
  label: string;
  isSelected: boolean;
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
}

interface RoomChatProps {
  partnerId: string;
  roomId: string;
}

export type { UsersProps, RoomChatProps, HobbyProps };
