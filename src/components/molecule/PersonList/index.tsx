import React, { memo } from "react";
import { Image, View } from "react-native";
import { PlaceholderUser } from "../../../../assets";
import { strings as str } from "../../../constants";
import { Button, TextItem } from "../../atom";
import styles from "./styles";

interface PersonListProps {
  onPress?: any;
  subtitle?: string;
  time?: string;
  title?: string;
  type?: string;
  uri?: string;
}

const PersonList = ({
  onPress,
  subtitle,
  time,
  title,
  type,
  uri,
}: PersonListProps) => {
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
            <TextItem type="normal12Text3">
              {time == "none" ? "" : time}
            </TextItem>
          )}
        </View>
        {subtitle !== undefined && (
          <TextItem
            type={
              type == "contact"
                ? "normal12Text1"
                : `normal14Text1${subtitle == str.typing ? "Italic" : ""}`
            }
          >
            {subtitle || "Ayo mulai chat"}
          </TextItem>
        )}
      </View>
    </Button>
  );
};

export default memo(PersonList);
