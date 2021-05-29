import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import TextItem from "./TextItem";
import { EmptyInbox } from "../../../assets";
import { spacing as sp, colorsPalette as cp } from "../../constants";
interface EmptyStateProps {
  navigation?: CompositeNavigationProp<any, any>;
}

const EmptyState: FC<EmptyStateProps> = ({ children }) => {
  const s = styles();
  return (
    <View style={s.container}>
      <View style={s.iconCont}>
        <EmptyInbox fill={cp.white4} width={88} height={88} />
      </View>
      <TextItem type="bold20Text1">Tidak ada percakapan</TextItem>
      <TextItem>Ayo mulai percakapan dengan teman baru</TextItem>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    iconCont: {
      marginBottom: sp.sm,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default EmptyState;
