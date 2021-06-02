import {
  CompositeNavigationProp,
  RouteProp,
  useRoute,
} from "@react-navigation/core";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Image, View, BackHandler } from "react-native";
import { GiftedChat, IMessage, Send } from "react-native-gifted-chat";
import { useSelector } from "react-redux";
import { PlaceholderUser, Send as SendIcon } from "../../assets";
import { AppCanvas, DefaultHeader, TextItem } from "../components";
import { db } from "../config";
import { UsersProps } from "../config/types";
import {
  colorsPalette as cp,
  node as n,
  spacing,
  strings as str,
} from "../constants";
import StackParamsList from "../constants/screenParams";
import AppState from "../redux";

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
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const user = { _id: sessionReducer.uid };

  const isMounted = useRef(true);

  const typing = (text: string) => {
    db.ref(
      `${n.room_chats}/${roomId}/${n.participants}/${sessionReducer.uid}`
    ).update({ isTyping: text.length > 0 });
  };

  const onSend = useCallback((messageGift: IMessage[]) => {
    db.ref(
      `${n.room_chats}/${roomId}/${n.participants}/${sessionReducer.uid}`
    ).update({ isTyping: false });
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

  const renderAvatar = useCallback(
    () => <Image source={PlaceholderUser} style={{ width: 32, height: 32 }} />,
    []
  );

  const findPartner = async () => {
    const dataUser = await db.ref(`${n.users}/${partnerId}`).once("value");
    const user = dataUser.val();
    if (isMounted) setPartner(user);
  };

  const onValueChange = async () => {
    setIsLoading(true);
    const data = await db
      .ref(`${n.messages}/${messageId}`)
      .orderByChild("createdAt")
      .once("value");
    if (data.val() == null && isMounted) {
      setIsLoading(false);
      return;
    }
    if (isMounted) {
      setMessages(
        Object.values(data.val()).map((chat: any) => ({
          _id: chat.createdAt,
          ...chat,
        }))
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findPartner();
    onValueChange();
    return () => {
      isMounted.current = false;
    };
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

  useEffect(() => {
    const onValueChange = db
      .ref(
        `${n.room_chats}/${roomId}/${n.participants}/${partnerId}/${n.isTyping}`
      )
      .on("value", (snapshot) => {
        const result = snapshot.val();
        if (isMounted) setIsTyping(result);
      });

    return () =>
      db.ref(`${n.messages}/${messageId}`).off("value", onValueChange);
  }, []);

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

  const header = useCallback(
    () => (
      <DefaultHeader
        title={partner?.displayName || partner?.email || "Username"}
        centerComponent={() => (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TextItem type="header">
              {partner?.displayName || partner?.email || "Username"}
            </TextItem>
            {isTyping && <TextItem type="normal12White">{str.typing}</TextItem>}
          </View>
        )}
      />
    ),
    [partner, isTyping]
  );

  useEffect(() => {
    const backAction = () => {
      typing("");
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

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
