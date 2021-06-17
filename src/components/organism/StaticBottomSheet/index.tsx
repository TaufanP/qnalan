import React, { FC, useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraColor } from "../../../../assets";
import { StaticBottomSheetProps } from "../../../config/types";
import Button from "../../atom/Button";
import TextItem from "../../atom/TextItem";
import styles from "./styles";

const { height } = Dimensions.get("screen");
const { alert } = Alert;

const iconWidth = 168;

const StaticBottomSheet: FC<StaticBottomSheetProps> = ({
  onPressLeft = () => alert("tets"),
  onPressRight = () => alert("tets"),
  onPress = () => alert("tets"),
  visible = false,
  leftLabel = "KAMERA",
  rightLabel = "GALERI",
  mainLabel = "Continue",
  mainTitle = "Ambil gambarmu",
  subTitle = "Kamu bisa menggunakan kamera ataupun galeri.",
  action = false,
  setVisible = (e: boolean) => alert("test"),
  mainIcon = <CameraColor width={iconWidth * 0.7} height={iconWidth * 0.7} />,
  customComp,
}) => {
  const s = styles();

  const fadeAnim = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        useNativeDriver: false,
        duration: 400,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        useNativeDriver: false,
        duration: 200,
      }),
    ]).start();
  };

  const fadeOut = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        useNativeDriver: false,
        duration: 100,
      }),
      Animated.timing(fadeAnim, {
        toValue: height,
        useNativeDriver: false,
        duration: 400,
      }),
    ]).start();
  };

  useEffect(() => {
    if (visible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[s.emptyCont, { transform: [{ translateY: fadeAnim }] }]}
    >
      <Animated.View style={[s.blackBackground, { opacity }]}>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          activeOpacity={1}
          style={s.touchArea}
        />
      </Animated.View>
      <View style={s.contentCont}>
        <View style={s.imageGroup}>
          {customComp == undefined ? (
            <>
              <View style={s.titleCont}>{mainIcon}</View>
              <Text style={s.titleText}>{mainTitle}</Text>
              <Text style={s.subtitleText}>{subTitle}</Text>
            </>
          ) : (
            customComp()
          )}
        </View>
        <View style={s.buttonsCont}>
          {action ? (
            <Button onPress={onPress} style={s.actionButton}>
              <TextItem type="bold14White">{mainLabel}</TextItem>
            </Button>
          ) : (
            <>
              <View style={s.buttonCont}>
                <Button onPress={onPressLeft} style={s.leftButton}>
                  <TextItem type="bold14Blue3">{leftLabel}</TextItem>
                </Button>
              </View>
              <View style={s.buttonCont}>
                <Button onPress={onPressRight} style={s.rightButton}>
                  <TextItem type="bold14White">{rightLabel}</TextItem>
                </Button>
              </View>
            </>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

export default StaticBottomSheet;
