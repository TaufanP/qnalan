import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { AppCanvas, Button, Contact } from "../components";
import { db } from "../config";
import { UsersProps } from "../config/types";
import { pages as p, spacing as sp } from "../constants";

interface ContactListScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const ContactListScreen: FC<ContactListScreenProps> = ({ navigation }) => {
  const [users, setUsers] = useState<UsersProps[]>([]);

  const getUsers = async () => {
    const data = await db.ref("users").once("value");
    const dataArray = Object.entries(data.val());
    setUsers(dataArray.map((item: any) => ({ uid: item[0], ...item[1] })));
  };

  const keyExtractor = (item: UsersProps) => `${item.uid}`;
  const renderItem = ({ item }: { item: UsersProps }) => (
    <Contact user={item} onPress={() => navigation.replace(p.RoomChatScreen)} />
  );

  return (
    <AppCanvas>
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
    </AppCanvas>
  );
};

export default ContactListScreen;
