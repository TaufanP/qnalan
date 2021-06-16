import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { View } from "react-native";
import styles from "./styles";

interface AppHeaderProps {
  navigation?: CompositeNavigationProp<any, any>;
}

const AppHeader: FC<PropsWithChildren<AppHeaderProps>> = ({ children }) => {
  const s = styles();
  return <View style={s.container}>{children}</View>;
};

export default AppHeader;
