import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import TextItem from "./TextItem";
import { EmptyInbox, EmptyInboxColored } from "../../../assets";
import { spacing as sp, colorsPalette as cp } from "../../constants";
interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  icon?: () => ReactNode;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "Tidak ada percakapan",
  subtitle = "Ayo mulai percakapan dengan teman baru",
  icon = () => <EmptyInboxColored width={120} height={120} />,
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      <View style={s.iconCont}>{icon()}</View>
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
