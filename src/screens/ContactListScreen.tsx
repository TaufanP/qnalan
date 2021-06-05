import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, Text, View } from "react-native";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import { useSelector } from "react-redux";
//@ts-ignore
import Slider from "rn-range-slider";
import {
  AppCanvas,
  Button,
  CheckBoxes,
  DefaultHeader,
  FilterButton,
  PersonList,
  RenderHandle,
  TextItem,
  ToggleButtons,
} from "../components";
import {
  Label,
  Notch,
  Rail,
  RailSelected,
  Thumb,
} from "../components/organism/ContactSlider";
import { db, heightPercent, widthPercent } from "../config";
import { FilterDataProps, RoomChatProps, UsersProps } from "../config/types";
import {
  colorsPalette as cp,
  node as n,
  pages as p,
  spacing as sp,
} from "../constants";
import {
  batchValue,
  filterDataValue,
  genderValue,
  HobbiesValue,
  majorValue,
} from "../constants/defaultValue/local";
import AppState from "../redux";

interface ContactListScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}

interface FilterCatProps extends FilterDataProps {
  onPress?: any;
}

const ContactListScreen: FC<ContactListScreenProps> = ({ navigation }) => {
  const { sessionReducer } = useSelector((state: AppState) => state);

  const [isSheet, setIsSheet] = useState<boolean>(false);

  const [users, setUsers] = useState<UsersProps[]>([]);

  const [filterCat, setFilterCat] = useState<FilterCatProps[]>(filterDataValue);

  const isMounted = useRef(true);
  const scrollRef = useRef<any>(null);

  const createChatRoom = async (partnerId: string) => {
    const chatList = await db
      .ref(`${n.users}/${sessionReducer.uid}/${n.roomChats}`)
      .once("value");
    if (chatList.val() == null) {
      addingChatRoom(partnerId);
      return;
    }
    const chats: RoomChatProps[] = Object.values(chatList.val());
    const isExist = chats.findIndex((chat) => chat.partnerId == partnerId);
    if (isExist !== -1) {
      const details = chats[isExist];
      const msgId = await db
        .ref(`${n.room_chats}/${details.roomId}/${n.messageId}`)
        .once("value");
      navigation.replace(p.RoomChatScreen, {
        partnerId,
        roomId: details.roomId,
        messageId: msgId.val(),
      });
      return;
    }
    addingChatRoom(partnerId);
  };

  const addingChatRoom = async (partnerId: string) => {
    const roomId = db.ref(n.room_chats).push().key;
    const messageId = db.ref(n.messages).push().key;
    await db.ref(`${n.room_chats}/${roomId}`).set({
      lastMessage: { text: "", createdAt: "" },
      participants: {
        [sessionReducer.uid]: { isTyping: false },
        [partnerId]: { isTyping: false },
      },
      messageId,
    });
    db.ref(`${n.users}/${sessionReducer.uid}/${n.roomChats}`).push({
      roomId,
      partnerId,
    });
    db.ref(`${n.users}/${partnerId}/${n.roomChats}`).push({
      roomId,
      partnerId: sessionReducer.uid,
    });
    navigation.replace(p.RoomChatScreen, { partnerId, roomId, messageId });
  };

  const getUsers = async () => {
    const data = await db.ref(n.users).once("value");
    const dataArray = Object.entries(data.val());
    if (isMounted.current)
      setUsers(
        dataArray
          .filter((user: any) => user[0] !== sessionReducer.uid)
          .map((item: any) => ({ uid: item[0], ...item[1] }))
      );
  };

  const snapTo = (index: number) => {
    scrollRef.current.snapTo(index);
  };

  const keyExtractor = (item: UsersProps) => `${item.uid}`;

  const renderItem = useCallback(({ item }: { item: UsersProps }) => {
    return (
      <PersonList
        {...{
          title: item.displayName || item.email || "Username",
          uri: item.photoURL,
          onPress: () => createChatRoom(item.uid),
          subtitle: item.bio || "Halo semua!",
          type: "contact",
        }}
      />
    );
  }, []);

  const header = useCallback(
    () => (
      <DefaultHeader
        title="Teman Sekitar"
        onPress={() => navigation.goBack()}
      />
    ),
    []
  );

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    console.log(low);
    console.log(high);
  }, []);

  const scrollComp = () => (
    <View style={{ width: "100%" }}>
      <TextItem type="bold14Text1">Umur</TextItem>
      <Slider
        min={15}
        max={40}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
        style={{ marginBottom: sp.sm, marginTop: sp.sm }}
      />
      <TextItem type="bold14Text1">Jenis Kelamin</TextItem>
      <ToggleButtons containerStyle={{ marginTop: 0 }} data={genderValue} />
      <TextItem type="bold14Text1">Angkatan</TextItem>
      <ToggleButtons containerStyle={{ marginTop: 0 }} data={batchValue} />
      <TextItem type="bold14Text1">Jurusan</TextItem>
      <CheckBoxes
        data={majorValue.map((major, majorIndex) => ({
          value: majorIndex,
          label: major,
        }))}
      />
      <TextItem type="bold14Text1">Hobi</TextItem>
      <ToggleButtons
        containerStyle={{ marginTop: 0 }}
        data={HobbiesValue.map((hobby) => ({
          value: hobby.id,
          label: hobby.label,
        }))}
      />
      <Button
        style={{
          height: 50,
          backgroundColor: cp.blue3,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: sp.sm,
          borderRadius: 8,
        }}
      >
        <TextItem type="bold16White">TERAPKAN</TextItem>
      </Button>
    </View>
  );

  const renderHandle = useCallback(() => <RenderHandle />, []);

  useEffect(() => {
    getUsers();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <AppCanvas header={header}>
      <View style={{ marginTop: sp.sm, marginLeft: sp.sm }}>
        <FilterButton
          label="Kriteria"
          count={0}
          onPress={() => {
            setIsSheet(true);
            snapTo(1);
          }}
        />
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ marginTop: sp.sm }}
      />
      {isSheet && (
        <Animated.View
          style={{
            position: "absolute",
            width: widthPercent(100),
            height: heightPercent(100),
            backgroundColor: "#0005",
          }}
        />
      )}
      <ScrollBottomSheet // If you are using TS, that'll infer the renderItem `item` type
        ref={scrollRef}
        componentType="ScrollView"
        snapPoints={[128, "50%", heightPercent(110)]}
        initialSnapIndex={2}
        renderHandle={renderHandle}
        contentContainerStyle={{
          padding: 16,
          backgroundColor: cp.white,
        }}
        containerStyle={{
          backgroundColor: cp.white,
          borderRadius: 20,
        }}
        onSettle={(index) => index == 2 && setIsSheet(false)}
      >
        {scrollComp()}
      </ScrollBottomSheet>
    </AppCanvas>
  );
};

export default ContactListScreen;
