import React, { FC } from "react";
import { View } from "react-native";
import { ArrowBack } from "../../../../assets";
import { ButtonHeader, TextItem } from "../../atom";
import styles from "./styles";

interface DefaultHeaderProps {
  title: string;
  onPress?: any;
  onPressRight?: any;
  rightComponent?: () => JSX.Element;
  centerComponent?: () => JSX.Element;
}

const DefaultHeader: FC<DefaultHeaderProps> = ({
  title = "User name",
  onPress,
  rightComponent = () => <></>,
  centerComponent,
  onPressRight,
}) => {
  const s = styles();
  const CenterComp =
    centerComponent !== undefined
      ? () => centerComponent()
      : () => <TextItem type="header">{title}</TextItem>;

  return (
    <View style={s.container}>
      <ButtonHeader onPress={onPress}>
        <ArrowBack width={16} height={16} fill={"#FFF"} />
      </ButtonHeader>
      <View style={s.midContent}>
        <CenterComp />
      </View>
      <ButtonHeader onPress={onPressRight}>{rightComponent()}</ButtonHeader>
    </View>
  );
};

export default DefaultHeader;
