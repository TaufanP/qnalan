import React, { FC, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { PlaceholderUser } from "../../../assets";
import { db } from "../../config";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import { Button, TextItem } from "../atom";

interface ChatListProps {
  roomId: any;
  partnerId: any;
  onPress: any;
}

const ChatList: FC<ChatListProps> = ({ roomId, onPress, partnerId }) => {
  const [detail, setDetail] = useState<any>({});
  const [room, setRoom] = useState<any>({});
  const s = styles();
  const getDetail = async () => {
    const partnerDetail = await db.ref(`users/${partnerId}`).once("value");
    setDetail(partnerDetail.val());
  };
  useEffect(() => {
    getDetail();
  }, []);
  useEffect(() => {
    const onValuChange = db
      .ref(`room_chats/${roomId}`)
      .on("value", (snapshot) => setRoom(snapshot.val()));

    return () => db.ref(`room_chats/${roomId}`).off("value", onValuChange);
  }, []);
  return (
    <Button
      style={s.container}
      onPress={() => onPress({ messageId: room.messageId })}
    >
      <View style={s.photoCont}>
        <Image source={PlaceholderUser} style={s.photo} />
      </View>
      <View>
        <TextItem style={{ fontSize: 12 }}>
          {detail.displayName || "Username"}
        </TextItem>
        <TextItem style={{ fontSize: 10 }}>
          {room.lastMessage || "Ayo mulai chat"}
        </TextItem>
      </View>
    </Button>
  );
};

const styles = () =>
  StyleSheet.create({
    photo: { width: "100%", height: "100%" },
    photoCont: {
      width: 40,
      height: 40,
      borderRadius: 40,
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

export default ChatList;
