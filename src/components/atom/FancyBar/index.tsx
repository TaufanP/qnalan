import React, { FC, memo, useEffect } from "react";
import { Animated } from "react-native";
import { FancyTypes } from "../../../config/types";
import { fancyStates as fan, spacing as sp } from "../../../constants";
import Button from "../Button";
import TextItem from "../TextItem";
import styles from "./styles";

const { defaultState } = fan;

interface FancyBarProps {
  fancyBarState?: FancyTypes;
  setFancyBarState?: any;
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

export default memo(FancyBar);
