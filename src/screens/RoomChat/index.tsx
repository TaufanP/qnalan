import {
  CompositeNavigationProp,
  RouteProp,
  useRoute,
} from "@react-navigation/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Image, View } from "react-native";
import {
  GiftedChat,
  IMessage,
  Send,
  User,
  InputToolbar,
  Composer,
} from "react-native-gifted-chat";
import { useSelector } from "react-redux";
import { PlaceholderUser, Send as SendIcon, VideoCall } from "../../../assets";
import { AppCanvas, DefaultHeader, TextItem } from "../../components";
import { db } from "../../config";
import { UsersProps } from "../../config/types";
import {
  colorsPalette as cp,
  node as n,
  pages as p,
  spacing,
  strings as str,
} from "../../constants";
import StackParamsList from "../../constants/screenParams";
import AppState from "../../redux";
import { notify } from "../../services";
import styles from "./styles";

interface RoomChatProps {
  navigation: CompositeNavigationProp<any, any>;
}

const RoomChat = ({ navigation }: RoomChatProps) => {
  const s = styles();
  const {
    sessionReducer: { uid, displayName },
  } = useSelector((state: AppState) => state);

  const route = useRoute<RouteProp<StackParamsList, "ROOM_CHAT_SCREEN">>();
  const { messageId, partnerId, roomId } = route.params;

  const [partner, setPartner] = useState<UsersProps>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const user: User = { _id: uid };

  const isMounted = useRef(true);

  const findPartner = async () => {
    const dataUser = await db.ref(`${n.users}/${partnerId}`).once("value");
    db.ref(`${n.room_chats}/${roomId}/${n.participants}/${uid}`).update({
      isRead: true,
    });
    if (isMounted.current) setPartner(dataUser.val());
  };

  const onValueChange = async () => {
    setIsLoading(true);
    const data = await db
      .ref(`${n.messages}/${messageId}`)
      .orderByChild("createdAt")
      .once("value");
    if (data.val() == null && isMounted.current) {
      setIsLoading(false);
      return;
    }
    const messagesArray = Object.values(data.val()).map((chat: any) => ({
      _id: chat.createdAt,
      ...chat,
    }));
    const sortedMsg = messagesArray.sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0
    );
    if (isMounted.current) {
      setMessages(sortedMsg);
      setIsLoading(false);
    }
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={s.renderSendStyle}>
          <SendIcon width={24} height={24} fill={cp.main} />
        </View>
      </Send>
    );
  };

  const typing = (text: string) => {
    db.ref(`${n.room_chats}/${roomId}/${n.participants}/${uid}`).update({
      isTyping: text.length > 0,
    });
  };

  const header = useCallback(
    () => (
      <DefaultHeader
        title={partner?.displayName || partner?.email || "Username"}
        centerComponent={() => (
          <View style={s.headerStyle}>
            <TextItem type="header">
              {partner?.displayName || partner?.email || "Username"}
            </TextItem>
            {isTyping && <TextItem type="normal12White">{str.typing}</TextItem>}
          </View>
        )}
        rightComponent={() => (
          <VideoCall fill={cp.white} width={32} height={32} />
        )}
        onPressRight={() => navigation.navigate(p.VideoCall)}
        onPress={() => navigation.goBack()}
      />
    ),
    [partner, isTyping]
  );

  const onSend = useCallback(
    async (messageGift: IMessage[]) => {
      db.ref(`${n.room_chats}/${roomId}/${n.participants}/${uid}`).update({
        isTyping: false,
      });
      db.ref(`${n.room_chats}/${roomId}/${n.participants}/${partnerId}`).update(
        { isRead: false }
      );
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
      db.ref(`${n.users}/${uid}/${n.roomChats}/${partnerId}`).update({
        createdAt,
      });
      db.ref(`${n.users}/${partnerId}/${n.roomChats}/${uid}`).update({
        createdAt,
      });
      if (partner?.token)
        await notify({
          body: messageGift[0].text,
          title: displayName || "",
          to: partner?.token,
          linking: `room-chat/${uid}/${roomId}/${messageId}`,
        });
    },
    [partner]
  );

  const renderAvatar = useCallback(() => {
    const source = partner?.photoURL
      ? { uri: partner?.photoURL }
      : PlaceholderUser;
    return (
      <View style={s.renderAvatarStyle}>
        <Image source={source} style={s.avatarImage} />
      </View>
    );
  }, [partner]);

  const renderInputToolbar = (props: any) => (
    <InputToolbar {...props} containerStyle={s.renderInputStyle} />
  );
  const renderComposer = (props: any) => (
    <Composer {...props} textInputStyle={s.renderComposerStyle} />
  );

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
        if (isMounted.current) setIsTyping(snapshot.val());
      });

    return () =>
      db.ref(`${n.messages}/${messageId}`).off("value", onValueChange);
  }, []);

  useEffect(() => {
    const backAction = () => {
      typing("");
      db.ref(`${n.room_chats}/${roomId}/${n.participants}/${uid}`).update({
        isRead: true,
      });
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
        onInputTextChanged={typing}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        alwaysShowSend
      />
    </AppCanvas>
  );
};

export default RoomChat;
