import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
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

  const s = styles();

  const [isSheet, setIsSheet] = useState<boolean>(false);

  const [users, setUsers] = useState<UsersProps[]>([]);

  const [age, setAge] = useState({ min: 15, max: 40 });
  const [gender, setGender] = useState<number[]>([]);
  const [batch, setBatch] = useState<number[]>([]);
  const [major, setMajor] = useState<number[]>([]);
  const [hobby, setHobby] = useState<number[]>([]);

  const [filterCat, setFilterCat] = useState<FilterCatProps[]>(filterDataValue);

  const isMounted = useRef(true);
  const scrollRef = useRef<any>(null);
  const ageRef = useRef({ min: 15, max: 40 });

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

  const filterSet = () => {
    setAge(ageRef.current);
    snapTo(1);
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
    ageRef.current = { min: low, max: high };
  }, []);

  const genderPress = useCallback(
    (value: number) =>
      setGender((current) => {
        const isExist: boolean =
          current.findIndex((gend) => gend == value) !== -1;
        if (isExist) {
          return current.filter((gend) => gend !== value);
        }
        return [...current, value];
      }),
    [gender]
  );
  const GenderToggler = useCallback(
    () => (
      <>
        <TextItem type="bold14Text1">Jenis Kelamin</TextItem>
        <ToggleButtons
          containerStyle={s.togglerCont}
          data={genderValue}
          selected={gender}
          onPress={genderPress}
        />
      </>
    ),
    [gender]
  );

  const batchPress = useCallback(
    (value: number) =>
      setBatch((current) => {
        const isExist: boolean =
          current.findIndex((currBatch) => currBatch == value) !== -1;
        if (isExist) {
          return current.filter((currBatch) => currBatch !== value);
        }
        return [...current, value];
      }),
    [batch]
  );
  const BatchToggler = useCallback(
    () => (
      <>
        <TextItem type="bold14Text1">Angkatan</TextItem>
        <ToggleButtons
          containerStyle={s.togglerCont}
          data={batchValue}
          selected={batch}
          onPress={batchPress}
        />
      </>
    ),
    [batch]
  );

  const majorPress = useCallback(
    (value: number) =>
      setMajor((current) => {
        const isExist: boolean =
          current.findIndex((currMajor) => currMajor == value) !== -1;
        if (isExist) {
          return current.filter((currMajor) => currMajor !== value);
        }
        return [...current, value];
      }),
    [major]
  );
  const MajorToggler = useCallback(
    () => (
      <>
        <TextItem type="bold14Text1">Jurusan</TextItem>
        <CheckBoxes
          data={majorValue.map((major, majorIndex) => ({
            value: majorIndex,
            label: major,
          }))}
          selected={major}
          onPress={majorPress}
        />
      </>
    ),
    [major]
  );

  const hobbyPress = useCallback(
    (value: number) =>
      setHobby((current) => {
        const isExist: boolean =
          current.findIndex((currHobby) => currHobby == value) !== -1;
        if (isExist) {
          return current.filter((currHobby) => currHobby !== value);
        }
        return [...current, value];
      }),
    [hobby]
  );
  const HobbyToggler = useCallback(
    () => (
      <>
        <TextItem type="bold14Text1">Hobi</TextItem>
        <ToggleButtons
          containerStyle={s.togglerCont}
          data={HobbiesValue.map((hobby) => ({
            value: hobby.id,
            label: hobby.label,
          }))}
          selected={hobby}
          onPress={hobbyPress}
        />
      </>
    ),
    [hobby]
  );

  const scrollComp = useCallback(
    () => (
      <View style={s.scrollCont}>
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
          style={s.sliderStyle}
        />
        <GenderToggler />
        <BatchToggler />
        <MajorToggler />
        <HobbyToggler />
        <Button style={s.scrollButton} onPress={filterSet}>
          <TextItem type="bold16White">TERAPKAN</TextItem>
        </Button>
      </View>
    ),
    [age, gender, batch, major, hobby]
  );

  const renderHandle = useCallback(() => <RenderHandle />, []);

  const onSettle = useCallback(
    (index) => index == 1 && setIsSheet(false),
    [isSheet]
  );

  const onFilterPress = useCallback(() => {
    setIsSheet(true);
    snapTo(0);
  }, []);

  useEffect(() => {
    getUsers();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <AppCanvas header={header}>
      <View style={s.filterButtonCont}>
        <FilterButton label="Kriteria" count={0} onPress={onFilterPress} />
      </View>
      <Button onPress={() => console.log({ age, gender, batch })}>
        <TextItem>TeSSSSSSSST</TextItem>
      </Button>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ marginTop: sp.sm }}
      />
      {isSheet && <Animated.View style={s.overlayCont} />}
      <ScrollBottomSheet
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        componentType="ScrollView"
        snapPoints={["20%", heightPercent(110)]}
        initialSnapIndex={1}
        renderHandle={renderHandle}
        contentContainerStyle={s.scrollContentContainerStyle}
        containerStyle={s.scrollContainerStyle}
        onSettle={onSettle}
      >
        {scrollComp()}
      </ScrollBottomSheet>
    </AppCanvas>
  );
};

export default ContactListScreen;

const styles = () =>
  StyleSheet.create({
    scrollContainerStyle: {
      backgroundColor: cp.white,
      borderRadius: 20,
    },
    scrollContentContainerStyle: {
      padding: 16,
      backgroundColor: cp.white,
    },
    sliderStyle: { marginBottom: sp.sm, marginTop: sp.sm },
    overlayCont: {
      position: "absolute",
      width: widthPercent(100),
      height: heightPercent(100),
      backgroundColor: "#0005",
    },
    filterButtonCont: { marginTop: sp.sm, marginLeft: sp.sm },
    scrollCont: { width: "100%" },
    togglerCont: { marginTop: 0 },
    scrollButton: {
      height: 50,
      backgroundColor: cp.blue3,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: sp.sm,
      borderRadius: 8,
    },
  });
