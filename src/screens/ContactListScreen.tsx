import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { AppCanvas, Button, Contact } from "../components";
import { db } from "../config";
import { UsersProps } from "../config/types";
import { pages as p, spacing as sp } from "../constants";
import { useSelector } from "react-redux";
import AppState from "../redux";

interface ContactListScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const ContactListScreen: FC<ContactListScreenProps> = ({ navigation }) => {
  const { sessionReducer } = useSelector((state: AppState) => state);
  const [users, setUsers] = useState<UsersProps[]>([]);

  const getUsers = async () => {
    const data = await db.ref("users").once("value");
    const dataArray = Object.entries(data.val());
    setUsers(
      dataArray
        .filter((user: any) => user[0] !== sessionReducer.uid)
        .map((item: any) => ({ uid: item[0], ...item[1] }))
    );
  };
  // () => navigation.replace(p.RoomChatScreen)

  const createChatRoom = async (id: string) => {
    const roomKey = db.ref(`room_chats/`).push().key;
    await db.ref(`room_chats/${roomKey}`).set({
      lastMessage: "",
      participants: {
        [sessionReducer.uid]: { isTyping: false },
        [id]: { isTyping: false },
      },
      messageId: db.ref("messages").push().key,
    });
    db.ref(`users/${sessionReducer.uid}/roomChats`).push(roomKey);
    db.ref(`users/${id}/roomChats`).push(roomKey);
  };

  const keyExtractor = (item: UsersProps) => `${item.uid}`;
  const renderItem = ({ item }: { item: UsersProps }) => (
    <Contact user={item} onPress={() => createChatRoom(item.uid)} />
  );

  return (
    <AppCanvas>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ marginTop: sp.sm }}
      />
      <Button
        style={{ width: 40, height: 40, backgroundColor: "red" }}
        onPress={getUsers}
      />
    </AppCanvas>
  );
};

export default ContactListScreen;
