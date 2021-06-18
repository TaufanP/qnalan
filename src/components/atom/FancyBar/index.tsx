import React, { memo, useCallback, useEffect } from "react";
import { Animated } from "react-native";
import { FancyTypes } from "../../../config/types";
import { fancyStates as fan } from "../../../constants";
import Button from "../Button";
import TextItem from "../TextItem";
import styles from "./styles";

const { defaultState } = fan;

interface FancyBarProps {
  fancyBarState?: FancyTypes;
  setFancyBarState?: any;
}

const duration = 200;

const FancyBar = ({
  fancyBarState = defaultState,
  setFancyBarState,
}: FancyBarProps) => {
  const { visible, msg, type: state } = fancyBarState;

  const bottomContainer = new Animated.Value(0);

  const s: { [key: string]: any } = styles({
    bottomContainer,
    state,
  });

  const onCalled = () => {
    if (visible) {
      Animated.sequence([
        Animated.timing(bottomContainer, {
          toValue: -74,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(bottomContainer, {
          delay: 2400,
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]).start(() => setFancyBarState(defaultState));
      return;
    }
  };

  const commandPress = useCallback(() => setFancyBarState(false), []);

  useEffect(() => {
    onCalled();
  }, [fancyBarState]);

  return (
    <Animated.View style={s.container}>
      <TextItem type="defaultWhite" style={s.msgText}>
        {msg}
      </TextItem>
      <Button style={s.button} onPress={commandPress}>
        <TextItem type="bold14White">OK</TextItem>
      </Button>
    </Animated.View>
  );
};

export default memo(FancyBar);
