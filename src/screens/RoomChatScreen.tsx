import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { AppCanvas, DefaultHeader, HomeHeader } from "../components";
import { GiftedChat } from "react-native-gifted-chat";

interface RoomChatScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const RoomChatScreen: FC<RoomChatScreenProps> = ({ navigation }) => {
  return (
    <AppCanvas header={() => <DefaultHeader title="Username" />}>
      <GiftedChat
        messages={[]}
        onSend={(messages) =>
          console.log({ messages: JSON.stringify(messages) })
        }
        user={{
          _id: 1,
        }}
      />
    </AppCanvas>
  );
};

export default RoomChatScreen;
