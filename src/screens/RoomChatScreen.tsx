import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { AppCanvas, DefaultHeader, HomeHeader } from "../components";

interface RoomChatScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const RoomChatScreen: FC<RoomChatScreenProps> = ({ navigation }) => {
  return (
    <AppCanvas header={() => <DefaultHeader title="Username" />}></AppCanvas>
  );
};

export default RoomChatScreen;
