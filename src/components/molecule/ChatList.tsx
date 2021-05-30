import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { PlaceholderUser } from "../../../assets";
import { db } from "../../config";
import { UsersProps } from "../../config/types";
import { RoomDetailProps } from "../../config/types/firebase/roomDetail";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import { RoomDetailValue, UsersValue } from "../../constants/defaultValue";
import { Button, TextItem } from "../atom";
import moment from "moment";

interface ChatListProps {
  roomId: string;
  partnerId: string;
  onPress: any;
}

const ChatList: FC<ChatListProps> = ({ roomId, onPress, partnerId }) => {
  const [detail, setDetail] = useState<UsersProps>(UsersValue);
  const [room, setRoom] = useState<RoomDetailProps>(RoomDetailValue);

  const s = styles();

  const buttonOnPress = useCallback(
    () => onPress({ messageId: room.messageId, roomId, partnerId }),
    [roomId, partnerId, room]
  );

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
    <Button style={s.container} onPress={buttonOnPress}>
      <View style={s.photoCont}>
        <Image source={PlaceholderUser} style={s.photo} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={s.titleCont}>
          <TextItem style={{ fontWeight: "bold" }}>
            {detail.displayName || "Username"}
          </TextItem>
          <TextItem type="normal12Text3">
            {moment(room.lastMessage.createdAt).format("HH:MM") || "10"}
          </TextItem>
        </View>
        <TextItem>{room.lastMessage.text || "Ayo mulai chat"}</TextItem>
      </View>
    </Button>
  );
};

const styles = () =>
  StyleSheet.create({
    titleCont: { flexDirection: "row", justifyContent: "space-between" },
    photo: { width: "100%", height: "100%" },
    photoCont: {
      width: 48,
      height: 48,
      borderRadius: 48,
      borderColor: cp.white2,
      borderWidth: 1,
      marginRight: sp.sm,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    container: {
      flexDirection: "row",
      marginBottom: sp.sm,
      alignItems: "center",
      paddingHorizontal: sp.sm,
    },
  });

export default memo(ChatList);