import React, { FC, memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { PlaceholderUser } from "../../../assets";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import { Button, TextItem } from "../atom";

interface PersonListProps {
  uri?: string;
  title?: string;
  subtitle?: string;
  time?: string;
  onPress?: any;
}

const PersonList: FC<PersonListProps> = ({
  onPress,
  uri,
  title,
  time,
  subtitle,
}) => {
  const source = uri ? { uri } : PlaceholderUser;
  const s = styles();

  return (
    <Button style={s.container} onPress={onPress}>
      <View style={s.photoCont}>
        <Image source={source} style={s.photo} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={s.titleCont}>
          <TextItem style={{ fontWeight: "bold" }}>{title || "title"}</TextItem>
          {time !== undefined && (
            <TextItem type="normal12Text3">{time}</TextItem>
          )}
        </View>
        {subtitle !== undefined && (
          <TextItem>{subtitle || "Ayo mulai chat"}</TextItem>
        )}
      </View>
    </Button>
  );
};

const styles = () =>
  StyleSheet.create({
    titleCont: { flexDirection: "row", justifyContent: "space-between" },
    photo: { width: "100%", height: "100%" },
    photoCont: {
      width: 48,
      height: 48,
      borderRadius: 48,
      borderColor: cp.white2,
      borderWidth: 1,
      marginRight: sp.sm,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    container: {
      flexDirection: "row",
      marginBottom: sp.sm,
      alignItems: "center",
      paddingHorizontal: sp.sm,
    },
  });

export default memo(PersonList);
