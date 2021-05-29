import React, { FC, memo, useEffect } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import TextItem from "./TextItem";
import {
  colorsPalette as cp,
  fancyStates as fan,
  spacing as sp,
} from "../../constants";
import { FancyTypes } from "../../config/types";
import Button from "./Button";

const { width } = Dimensions.get("screen");
const { fancyType, defaultState } = fan;

interface FancyBarProps {
  fancyBarState?: FancyTypes;
  setFancyBarState?: any;
}

interface StyleProps {
  bottomContainer: any;
  state: string;
}

const FancyBar: FC<FancyBarProps> = ({
  fancyBarState = defaultState,
  setFancyBarState,
}) => {
  const bottomContainer = new Animated.Value(0);
  const onCalled = () => {
    if (fancyBarState.visible) {
      Animated.sequence([
        Animated.timing(bottomContainer, {
          toValue: -74,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bottomContainer, {
          delay: 2400,
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setFancyBarState(defaultState));
      return;
    }
  };
  const s: { [key: string]: any } = styles({
    bottomContainer,
    state: fancyBarState.type,
  });

  useEffect(() => {
    onCalled();
  }, [fancyBarState]);

  return (
    <Animated.View style={s.container}>
      <TextItem type="defaultWhite" style={{ paddingLeft: sp.sm }}>
        {fancyBarState.msg}
      </TextItem>
      <Button
        style={{ width: 50, marginLeft: 8 }}
        onPress={() => setFancyBarState(false)}
      >
        <TextItem type="bold14White">OK</TextItem>
      </Button>
    </Animated.View>
  );
};

const styles = ({ bottomContainer, state }: StyleProps) =>
  StyleSheet.create({
    container: {
      width: width - 32,
      left: 16,
      height: 50,
      bottom: -50,
      position: "absolute",
      backgroundColor:
        state == fancyType.success
          ? cp.green1
          : state == fancyType.warning
          ? "yellow"
          : cp.red1,
      borderRadius: 8,
      transform: [{ translateY: bottomContainer }],
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
  });

export default memo(FancyBar);
