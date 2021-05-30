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
  const [messages, setMessages] = useState<any>();
  const findPartner = async () => {
    const dataUser = await db.ref(`users/${partnerId}`).once("value");
    const user = dataUser.val();
    setPartner(user);
    const dataMessages = await db.ref(`messages/${messageId}`).once("value");
    const msgs = dataMessages.val();
    if (msgs == null) {
      setMessages([]);
    } else {
      const msgArray = Object.entries(msgs);
      const finalMessages = msgArray.map((chat: any) => ({
        _id: chat[0],
        ...chat[1],
      }));
      setMessages(finalMessages);
    }
  };

  const onSend = useCallback((messageGift: any) => {
    const createdAt = new Date().getTime();
    const { _id, ...finalMsg } = messageGift[0];
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, { ...messageGift[0], createdAt })
    );
    db.ref(`room_chats/${roomId}`).update({ lastMessage: messageGift[0].text });
    db.ref(`messages/${messageId}/${messageGift[0]._id}`).update({
      ...finalMsg,
      createdAt,
    });
  }, []);

  useEffect(() => {
    findPartner();
  }, []);

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
