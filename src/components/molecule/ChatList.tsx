import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useState, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { UsersProps } from "../../config/types";
import {
  strings as str,
  spacing as sp,
  colorsPalette as cp,
} from "../../constants";
import { Button, ButtonHeader, TextItem } from "../atom";
import { PlaceholderUser } from "../../../assets";
import { db } from "../../config";
import { useSelector } from "react-redux";
import AppState from "../../redux";

interface ChatListProps {
  roomId: any;
  onPress: any;
}

const ChatList: FC<ChatListProps> = ({ roomId, onPress }) => {
  const { sessionReducer } = useSelector((state: AppState) => state);
  const [detail, setDetail] = useState<any>({});
  const [partnerId, setPartnerId] = useState<any>({});
  const [room, setRoom] = useState<any>({});
  const s = styles();
  const getDetail = async () => {
    const data = await db.ref(`room_chats/${roomId}`).once("value");
    const roomDetail = data.val();
    setRoom(roomDetail);
    const ids = Object.keys(roomDetail.participants);
    const currentPartnerId =
      ids[ids.findIndex((uid) => uid !== sessionReducer.uid)];
    setPartnerId(currentPartnerId);
    const partnerDetail = await db
      .ref(`users/${currentPartnerId}`)
      .once("value");
    // const partner = await db.ref(`users/${partnerId}`)
    setDetail(partnerDetail.val());
  };
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <Button
      style={s.container}
      onPress={() => onPress({ partnerId, messageId: room.messageId, roomId })}
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
