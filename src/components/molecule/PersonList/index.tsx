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
  titleBold?: boolean;
  isRead?: boolean;
}

const PersonList = ({
  onPress,
  subtitle,
  time,
  title,
  type,
  uri,
  titleBold = true,
  isRead = true,
}: PersonListProps) => {
  const source = uri ? { uri } : PlaceholderUser;
  const s = styles();
  const typingType = `normal11Text1${subtitle == str.typing ? "Italic" : ""}`;
  return (
    <Button style={s.container} onPress={onPress}>
      <View style={s.photoCont}>
        <Image source={source} style={s.photo} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={s.titleCont}>
          <TextItem style={{ fontWeight: titleBold ? "bold" : "normal" }}>
            {title || "title"}
          </TextItem>
          {time !== undefined && (
            <TextItem type="normal12Text3">
              {time == "none" ? "" : time}
            </TextItem>
          )}
        </View>
        {subtitle !== undefined && (
          <TextItem
            numberOfLines={2}
            type={type == "contact" ? "normal12Text1" : typingType}
          >
            {subtitle || "Ayo mulai chat"}
          </TextItem>
        )}
      </View>
    </Button>
  );
};

export default memo(PersonList);
