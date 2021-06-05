import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import {
  AppCanvas,
  DefaultHeader,
  Filters,
  PersonList,
  TextItem,
} from "../components";
import { db } from "../config";
import { FilterDataProps, RoomChatProps, UsersProps } from "../config/types";
import { node as n, pages as p, spacing as sp } from "../constants";
import { filterDataValue } from "../constants/defaultValue/local";
import AppState from "../redux";

interface ContactListScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}

interface FilterCatProps extends FilterDataProps {
  onPress?: any;
}

const ContactListScreen: FC<ContactListScreenProps> = ({ navigation }) => {
  const { sessionReducer } = useSelector((state: AppState) => state);
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [filterCat, setFilterCat] = useState<FilterCatProps[]>(filterDataValue);

  const isMounted = useRef(true);

  const createChatRoom = async (partnerId: string) => {
    const chatList = await db
      .ref(`${n.users}/${sessionReducer.uid}/${n.roomChats}`)
      .once("value");
    if (chatList.val() == null) {
      addingChatRoom(partnerId);
      return;
    }
    const chats: RoomChatProps[] = Object.values(chatList.val());
    const isExist = chats.findIndex((chat) => chat.partnerId == partnerId);
    if (isExist !== -1) {
      const details = chats[isExist];
      const msgId = await db
        .ref(`${n.room_chats}/${details.roomId}/${n.messageId}`)
        .once("value");
      navigation.replace(p.RoomChatScreen, {
        partnerId,
        roomId: details.roomId,
        messageId: msgId.val(),
      });
      return;
    }
    addingChatRoom(partnerId);
  };

  const addingChatRoom = async (partnerId: string) => {
    const roomId = db.ref(n.room_chats).push().key;
    const messageId = db.ref(n.messages).push().key;
    await db.ref(`${n.room_chats}/${roomId}`).set({
      lastMessage: { text: "", createdAt: "" },
      participants: {
        [sessionReducer.uid]: { isTyping: false },
        [partnerId]: { isTyping: false },
      },
      messageId,
    });
    db.ref(`${n.users}/${sessionReducer.uid}/${n.roomChats}`).push({
      roomId,
      partnerId,
    });
    db.ref(`${n.users}/${partnerId}/${n.roomChats}`).push({
      roomId,
      partnerId: sessionReducer.uid,
    });
    navigation.replace(p.RoomChatScreen, { partnerId, roomId, messageId });
  };

  const getUsers = async () => {
    const data = await db.ref(n.users).once("value");
    const dataArray = Object.entries(data.val());
    if (isMounted.current)
      setUsers(
        dataArray
          .filter((user: any) => user[0] !== sessionReducer.uid)
          .map((item: any) => ({ uid: item[0], ...item[1] }))
      );
  };

  const keyExtractor = (item: UsersProps) => `${item.uid}`;

  const renderItem = useCallback(({ item }: { item: UsersProps }) => {
    return (
      <PersonList
        {...{
          title: item.displayName || item.email || "Username",
          uri: item.photoURL,
          onPress: () => createChatRoom(item.uid),
          subtitle: item.bio || "Halo semua!",
          type: "contact",
        }}
      />
    );
  }, []);

  const header = useCallback(
    () => (
      <DefaultHeader
        title="Teman Sekitar"
        onPress={() => navigation.goBack()}
      />
    ),
    []
  );

  useEffect(() => {
    getUsers();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <AppCanvas header={header}>
      <Filters data={filterCat} />
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ marginTop: sp.sm }}
      />
    </AppCanvas>
  );
};

export default ContactListScreen;
