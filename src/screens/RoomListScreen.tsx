import auth from "@react-native-firebase/auth";
import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import { Inbox } from "../../assets";
import {
  AppCanvas,
  ButtonFloat,
  ChatList,
  EmptyState,
  HomeHeader,
} from "../components";
import { db, heightPercent } from "../config";
import { RoomChatParams, RoomChatProps } from "../config/types";
import {
  colorsPalette as cp,
  node as n,
  pages as p,
  spacing as sp,
} from "../constants";
import AppState from "../redux";
import { loggingOut } from "../redux/actions";

interface RoomListScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}

const RoomListScreen: FC<RoomListScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { sessionReducer } = useSelector((state: AppState) => state);

  const [users, setUsers] = useState<RoomChatProps[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const isMounted = useRef(true);

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
      return;
    }
    dispatch(loggingOut());
    navigation.reset({
      index: 0,
      routes: [{ name: p.AuthScreen }],
    });
  };

  const keyExtractor = (item: RoomChatProps) => `${item.roomId}`;

  const renderItem = useCallback(
    ({ item }: { item: RoomChatProps }) => (
      <ChatList
        roomId={item.roomId}
        partnerId={item.partnerId}
        onPress={onPress}
      />
    ),
    []
  );

  const getUsers = async () => {
    try {
      db.ref(`${n.users}/${sessionReducer.uid}/${n.roomChats}`).on(
        "value",
        (snapshot) => {
          if (!isMounted.current) {
            return;
          }
          setUsers([]);
          if (snapshot.val() == null) {
            setUsers([]);
            return;
          }
          const usersData: RoomChatProps[] = Object.values(snapshot.val());
          setUsers(usersData);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const refreshing = async () => {
    setIsRefreshing(true);
    await getUsers();
    setIsRefreshing(false);
  };

  const ListEmptyComponent = () => (
    <View style={{ height: heightPercent(60) }}>
      <EmptyState />
    </View>
  );

  const header = useCallback(
    () => <HomeHeader onPress={() => navigation.toggleDrawer()} />,
    []
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    getUsers();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <AppCanvas header={header}>
      <FlatList
        data={users}
        onRefresh={() => refreshing()}
        refreshing={isRefreshing}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ marginTop: sp.sm }}
        ListEmptyComponent={ListEmptyComponent}
      />
      <ButtonFloat onPress={buttonPress}>
        <Inbox stroke={cp.white} />
      </ButtonFloat>
    </AppCanvas>
  );
};

export default RoomListScreen;
