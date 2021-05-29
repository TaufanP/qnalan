import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { colorsPalette as cp } from "../../constants";
import { ButtonHeader, TextItem } from "../atom";
interface HomeHeader {
  navigation?: CompositeNavigationProp<any, any>;
}

const HomeHeader: FC<PropsWithChildren<HomeHeader>> = ({ children }) => {
  const s = styles();
  return (
    <View style={s.container}>
      <ButtonHeader />
      <View style={s.midContent}>
        <TextItem type="header">Room Chat</TextItem>
      </View>
      <ButtonHeader />
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    midContent: { flex: 1, justifyContent: "center" },
    container: {
      flexDirection: "row",
    },
  });

export default HomeHeader;
