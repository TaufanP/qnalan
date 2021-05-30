import {
  CompositeNavigationProp,
  RouteProp,
  useRoute,
} from "@react-navigation/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { AppCanvas, DefaultHeader, HomeHeader } from "../components";
import { GiftedChat } from "react-native-gifted-chat";
import StackParamsList from "../constants/screenParams";
import { db } from "../config";
import { useSelector } from "react-redux";
import AppState from "../redux";

interface RoomChatScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const RoomChatScreen: FC<RoomChatScreenProps> = ({ navigation }) => {
  const { sessionReducer } = useSelector((state: AppState) => state);
  const route = useRoute<RouteProp<StackParamsList, "ROOM_CHAT_SCREEN">>();
  const { messageId, partnerId, roomId } = route.params;
  const [partner, setPartner] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const findPartner = async () => {
    const dataUser = await db.ref(`users/${partnerId}`).once("value");
    const user = dataUser.val();
    setPartner(user);
  };

  const onSend = useCallback((messageGift: any) => {
    const createdAt = new Date().getTime();
    const { _id, ...finalMsg } = messageGift[0];
    db.ref(`room_chats/${roomId}`).update({ lastMessage: messageGift[0].text });
    db.ref(`messages/${messageId}/${messageGift[0]._id}`).update({
      ...finalMsg,
      createdAt,
    });
  }, []);

  useEffect(() => {
    findPartner();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const onValuChange = async () => {
      const data = await db
        .ref(`messages/${messageId}`)
        .orderByChild("createdAt")
        .once("value");
      setMessages(
        Object.values(data.val()).map((chat: any) => ({
          _id: chat.createdAt,
          ...chat,
        }))
      );
      setIsLoading(false);
    };
    onValuChange();
    return () => db.ref(`messages/${messageId}`).off("value");
  }, []);

  useEffect(() => {
    const onValueChange = db
      .ref(`messages/${messageId}`)
      .orderByChild("createdAt")
      .on("child_added", (snapshot) => {
        let chats = [...messages];
        const result = snapshot.val();
        const finalMessages = { ...result, _id: result.createdAt };
        chats.push(finalMessages);
        if (!isLoading)
          setMessages((current) => {
            const isExist = current.findIndex(
              (chat) => chat._id == finalMessages._id
            );
            if (isExist == -1) {
              return [finalMessages, ...current];
            }
            return current;
          });
      });

    return () =>
      db.ref(`messages/${messageId}`).off("child_added", onValueChange);
  }, [isLoading]);

  return (
    <AppCanvas
      header={() => (
        <DefaultHeader title={partner?.displayName || "Username"} />
      )}
    >
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: sessionReducer.uid,
        }}
      />
    </AppCanvas>
  );
};

export default RoomChatScreen;
