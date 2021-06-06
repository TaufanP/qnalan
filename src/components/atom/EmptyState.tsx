import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import TextItem from "./TextItem";
import { EmptyInbox } from "../../../assets";
import { spacing as sp, colorsPalette as cp } from "../../constants";
interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "Tidak ada percakapan",
  subtitle = "Ayo mulai percakapan dengan teman baru",
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      <View style={s.iconCont}>
        <EmptyInbox fill={cp.white4} width={88} height={88} />
      </View>
      <TextItem type="bold20Text1">{title}</TextItem>
      <TextItem>{subtitle}</TextItem>
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
