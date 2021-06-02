import {
  CompositeNavigationProp,
  RouteProp,
  useRoute,
} from "@react-navigation/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Image, View } from "react-native";
import { GiftedChat, IMessage, Send } from "react-native-gifted-chat";
import { useSelector } from "react-redux";
import { PlaceholderUser } from "../../assets";
import { AppCanvas, DefaultHeader } from "../components";
import { db } from "../config";
import { UsersProps } from "../config/types";
import { colorsPalette as cp, node as n, spacing } from "../constants";
import StackParamsList from "../constants/screenParams";
import AppState from "../redux";
import { Send as SendIcon } from "../../assets";

interface RoomChatScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const RoomChatScreen: FC<RoomChatScreenProps> = ({ navigation }) => {
  const { sessionReducer } = useSelector((state: AppState) => state);
  const route = useRoute<RouteProp<StackParamsList, "ROOM_CHAT_SCREEN">>();
  const { messageId, partnerId, roomId } = route.params;
  const [partner, setPartner] = useState<UsersProps>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user = { _id: sessionReducer.uid };

  const typing = async (text: string) => {
    db.ref(
      `${n.room_chats}/${roomId}/${n.participants}/${sessionReducer.uid}`
    ).update({ isTyping: text.length > 0 });
  };

  const onSend = useCallback((messageGift: IMessage[]) => {
    const createdAt = new Date().getTime();
    const { _id, ...finalMsg } = messageGift[0];
    db.ref(`${n.room_chats}/${roomId}/${n.lastMessage}`).update({
      text: messageGift[0].text,
      createdAt,
    });
    db.ref(`${n.messages}/${messageId}/${messageGift[0]._id}`).update({
      ...finalMsg,
      createdAt,
    });
  }, []);

  const header = useCallback(
    () => (
      <DefaultHeader
        title={partner?.displayName || partner?.email || "Username"}
        onPress={() => navigation.goBack()}
      />
    ),
    [partner]
  );

  const renderAvatar = useCallback(
    () => <Image source={PlaceholderUser} style={{ width: 32, height: 32 }} />,
    []
  );

  useEffect(() => {
    let isMounted = true;
    const findPartner = async () => {
      const dataUser = await db.ref(`${n.users}/${partnerId}`).once("value");
      const user = dataUser.val();
      if (isMounted) setPartner(user);
    };
    findPartner();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const onValuChange = async () => {
      const data = await db
        .ref(`${n.messages}/${messageId}`)
        .orderByChild("createdAt")
        .once("value");
      if (data.val() == null) {
        setMessages([]);
        setIsLoading(false);
        return;
      }
      setMessages(
        Object.values(data.val()).map((chat: any) => ({
          _id: chat.createdAt,
          ...chat,
        }))
      );
      setIsLoading(false);
    };
    onValuChange();
    return () =>
      db.ref(`${n.messages}/${messageId}`).off("value", onValuChange);
  }, []);

  useEffect(() => {
    const onValueChange = db
      .ref(`${n.messages}/${messageId}`)
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
      db.ref(`${n.messages}/${messageId}`).off("child_added", onValueChange);
  }, [isLoading]);

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View
          style={{
            paddingHorizontal: spacing.sm,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SendIcon width={24} height={24} fill={cp.main} />
        </View>
      </Send>
    );
  };

  return (
    <AppCanvas header={header}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={user}
        renderAvatar={renderAvatar}
        renderSend={renderSend}
        placeholder="Ketik pesan"
        onInputTextChanged={(e) => typing(e)}
      />
    </AppCanvas>
  );
};

export default RoomChatScreen;
