import moment from "moment";
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { db } from "../../config";
import { UsersProps } from "../../config/types";
import { RoomDetailProps } from "../../config/types/firebase/roomDetail";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import { RoomDetailValue, UsersValue } from "../../constants/defaultValue";
import PersonList from "./PersonList";

interface ChatListProps {
  roomId: string;
  partnerId: string;
  onPress: any;
}

const ChatList: FC<ChatListProps> = ({ roomId, onPress, partnerId }) => {
  const [detail, setDetail] = useState<UsersProps>(UsersValue);
  const [room, setRoom] = useState<RoomDetailProps>(RoomDetailValue);

  const buttonOnPress = useCallback(
    () => onPress({ messageId: room.messageId, roomId, partnerId }),
    [roomId, partnerId, room]
  );

  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const finalTime = useMemo(() => {
    const isToday = date.getTime() < room?.lastMessage?.createdAt;
    const timeFormat = isToday ? "hh:mm A" : "D MMM YYYY";
    const timeFinal = room?.lastMessage?.createdAt
      ? moment(room.lastMessage.createdAt).format(timeFormat)
      : "none";
    return timeFinal;
  }, [room]);

  useEffect(() => {
    let isMounted = true;
    const getDetail = async () => {
      const partnerDetail = await db.ref(`users/${partnerId}`).once("value");

      if (isMounted) setDetail(partnerDetail.val());
    };
    getDetail();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const onValueChange = db
      .ref(`room_chats/${roomId}`)
      .on("value", (snapshot) => setRoom(snapshot.val()));

    return () => db.ref(`room_chats/${roomId}`).off("value", onValueChange);
  }, []);

  return (
    <PersonList
      {...{
        onPress: buttonOnPress,
        title: detail.email || "Username",
        subtitle: room.lastMessage.text || "Ayo mulai chat",
        time: finalTime,
        uri: detail.photoURL,
      }}
    />
  );
};

export default memo(ChatList);
