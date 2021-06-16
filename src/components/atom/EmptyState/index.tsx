import React, { FC, ReactNode } from "react";
import { View } from "react-native";
import { EmptyInboxColored } from "../../../../assets";
import TextItem from "../TextItem";
import styles from "./styles";

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

export default EmptyState;
