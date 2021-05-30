import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
  AppCanvas,
  Button,
  ButtonFloat,
  EmptyState,
  HomeHeader,
  ChatList,
} from "../components";
import SplashScreen from "react-native-splash-screen";
import auth from "@react-native-firebase/auth";
import { pages as p, spacing as sp } from "../constants";
import { Plus } from "../../assets";
import { UsersProps } from "../config/types";
import { useSelector } from "react-redux";
import AppState from "../redux";
import { db } from "../config";

interface HomeScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { sessionReducer } = useSelector((state: AppState) => state);
  const [users, setUsers] = useState<UsersProps[]>([]);
  const onAuthStateChanged = (user: any) => {
    if (user !== null) {
      SplashScreen.hide();
    }
  };

  const keyExtractor = (item: UsersProps) => `${item.uid}`;
  const renderItem = ({ item }: any) => (
    <ChatList
      roomId={item.roomId}
      partnerId={item.partnerId}
      onPress={({ messageId }: { messageId: string }) =>
        navigation.navigate(p.RoomChatScreen, {
          partnerId: item.partnerId,
          roomId: item.roomId,
          messageId,
        })
      }
    />
  );

  const getUsers = async () => {
    const data = await db
      .ref(`users/${sessionReducer.uid}/roomChats`)
      .once("value");
    setUsers(Object.values(data.val()));
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AppCanvas header={() => <HomeHeader />}>
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
      <EmptyState />
      <ButtonFloat onPress={() => navigation.navigate(p.ContactListScreen)}>
        <Plus />
      </ButtonFloat>
    </AppCanvas>
  );
};

export default HomeScreen;
