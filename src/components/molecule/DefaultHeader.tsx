import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ArrowBack } from "../../../assets";
import { ButtonHeader, TextItem } from "../atom";
interface DefaultHeaderProps {
  title: string;
  onPress?: any;
  onPressRight?: any;
  rightComponent?: () => JSX.Element;
}

const DefaultHeader: FC<DefaultHeaderProps> = ({
  title = "User name",
  onPress,
  rightComponent = () => <></>,
  onPressRight,
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      <ButtonHeader onPress={onPress}>
        <ArrowBack width={16} height={16} fill={"#FFF"} />
      </ButtonHeader>
      <View style={s.midContent}>
        <TextItem type="header">{title}</TextItem>
      </View>
      <ButtonHeader onPress={onPressRight}>{rightComponent()}</ButtonHeader>
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

export default DefaultHeader;
