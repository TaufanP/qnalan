import moment from "moment";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { db } from "../../../config";
import { UsersProps } from "../../../config/types";
import { RoomDetailProps } from "../../../config/types/firebase/roomDetail";
import { strings as str } from "../../../constants";
import { RoomDetailValue, UsersValue } from "../../../constants/defaultValue";
import PersonList from "../PersonList";
import AppState from "../../../redux";

interface ChatListProps {
  onPress: any;
  partnerId: string;
  roomId: string;
}

const ChatList = ({ roomId, onPress, partnerId }: ChatListProps) => {
  const {
    sessionReducer: { uid },
  } = useSelector((state: AppState) => state);
  const [detail, setDetail] = useState<UsersProps>(UsersValue);
  const [room, setRoom] = useState<RoomDetailProps>(RoomDetailValue);

  const isMounted = useRef(true);

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

  const lastMessage = useMemo(() => {
    const isTyping = room?.participants[partnerId]?.isTyping;
    const message = isTyping
      ? str.typing
      : room.lastMessage.text || "Ayo mulai chat";
    return message;
  }, [room]);

  const getDetail = async () => {
    const partnerDetail = await db.ref(`users/${partnerId}`).once("value");

    if (isMounted.current) setDetail(partnerDetail.val());
  };

  useEffect(() => {
    getDetail();

    return () => {
      isMounted.current = false;
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
        title: detail?.displayName || detail?.email || "Username",
        subtitle: lastMessage,
        time: finalTime,
        uri: detail?.photoURL || "",
        titleBold: false,
        isRead:
          room.participants[uid]?.isRead == undefined
            ? true
            : room.participants[uid].isRead,
      }}
    />
  );
};

export default memo(ChatList);
