import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { colorsPalette as cp } from "../../constants";
interface AppHeaderProps {
  navigation?: CompositeNavigationProp<any, any>;
}

const AppHeader: FC<PropsWithChildren<AppHeaderProps>> = ({ children }) => {
  const s = styles();
  return <View style={s.container}>{children}</View>;
};

const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: cp.main,
      height: 54,
    },
  });

export default AppHeader;
