import React, { FC, PropsWithChildren } from "react";
import { View } from "react-native";
import styles from "./styles";

const AppHeader: FC<PropsWithChildren<any>> = ({ children }) => {
  const s = styles();
  return <View style={s.container}>{children}</View>;
};

export default AppHeader;
