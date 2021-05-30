import auth from "@react-native-firebase/auth";
import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useSelector } from "react-redux";
import { Plus } from "../../assets";
import {
  AppCanvas,
  ButtonFloat,
  ChatList,
  EmptyState,
  HomeHeader,
} from "../components";
import { db } from "../config";
import { RoomChatParams, RoomChatProps } from "../config/types";
import { pages as p, spacing as sp } from "../constants";
import AppState from "../redux";

interface HomeScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { sessionReducer } = useSelector((state: AppState) => state);
  const [users, setUsers] = useState<RoomChatProps[]>([]);

  const onPress = useCallback(
    (item: RoomChatParams) =>
      navigation.navigate(p.RoomChatScreen, {
        partnerId: item.partnerId,
        roomId: item.roomId,
        messageId: item.messageId,
      }),
    []
  );

  const buttonPress = useCallback(
    () => navigation.navigate(p.ContactListScreen),
    []
  );

  const onAuthStateChanged = (user: any) => {
    if (user !== null) {
      SplashScreen.hide();
    }
  };

  const keyExtractor = (item: RoomChatProps) => `${item.roomId}`;

  const renderItem = ({ item }: { item: RoomChatProps }) => (
    <ChatList
      roomId={item.roomId}
      partnerId={item.partnerId}
      onPress={onPress}
    />
  );

  const ListEmptyComponent = () => <EmptyState />;

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    let isMounted = true;
    const getUsers = async () => {
      const data = await db
        .ref(`users/${sessionReducer.uid}/roomChats`)
        .once("value");
      if (isMounted) setUsers(Object.values(data.val()));
    };
    getUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppCanvas header={() => <HomeHeader />}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ marginTop: sp.sm }}
        ListEmptyComponent={ListEmptyComponent}
      />
      <ButtonFloat onPress={buttonPress}>
        <Plus />
      </ButtonFloat>
    </AppCanvas>
  );
};

export default HomeScreen;
