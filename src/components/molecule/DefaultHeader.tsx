import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ArrowBack } from "../../../assets";
import { ButtonHeader, TextItem } from "../atom";
interface DefaultHeaderProps {
  title: string;
}

const DefaultHeader: FC<DefaultHeaderProps> = ({ title = "User name" }) => {
  const s = styles();
  return (
    <View style={s.container}>
      <ButtonHeader>
        <ArrowBack width={20} height={20} fill={"#FFF"} />
      </ButtonHeader>
      <View style={s.midContent}>
        <TextItem type="header">{title}</TextItem>
      </View>
      <ButtonHeader>
        <></>
        {/* <Search width={24} height={24} fill={"#FFF"} /> */}
      </ButtonHeader>
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
