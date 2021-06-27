import React, { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, PanResponder } from "react-native";
import { OverlayNotifTypes } from "../../../config/types";
import Button from "../Button";
import styles from "./styles";

const OverlayNotif = ({
  onClose,
  visible,
  children,
}: PropsWithChildren<OverlayNotifTypes>) => {
  const s = styles();
  const pan = new Animated.Value(-400);

  const slideIn = () => {
    Animated.timing(pan, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(pan, {
      toValue: -400,
      duration: 150,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      onClose();
    }, 200);
    return;
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureStaste) => {
        const { dy } = gestureStaste;
        if (dy < 0) {
          pan.setValue(dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const { dy } = gestureState;
        if (dy < -40) {
          // Swipe up away
          slideOut();
          return;
        } else if (dy > -40 && dy < 0) {
          // Swipe back to initial position
          Animated.timing(pan, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) slideIn();

    const debounce = setTimeout(() => {
      slideOut();
    }, 3000);

    return () => {
      clearTimeout(debounce);
    };
  }, [visible]);

  return (
    <Animated.View
      style={[s.container, { transform: [{ translateY: pan }] }]}
      {...panResponder.panHandlers}
    >
      <Button style={s.childCont}>{children}</Button>
    </Animated.View>
  );
};

export default OverlayNotif;
