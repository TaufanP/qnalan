import React, { FC, ReactNode, useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraColor } from "../../../assets";
import { StaticBottomSheetProps } from "../../config/types";
import {
  colorsPalette as cp,
  spacing as sp,
  textSize as ts,
} from "../../constants";
import TextItem from "../atom/TextItem";
import Button from "../atom/Button";

const { width, height } = Dimensions.get("screen");
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
          <View
            style={{
              width: iconWidth,
              height: iconWidth,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {mainIcon}
          </View>
          <Text style={s.titleText}>{mainTitle}</Text>
          <Text
            style={{
              textAlign: "center",
              color: cp.text1,
              paddingHorizontal: 16,
            }}
          >
            {subTitle}
          </Text>
        </View>
        <View style={s.buttonsCont}>
          {action ? (
            <Button onPress={onPress}>
              <TextItem>{mainLabel}</TextItem>
            </Button>
          ) : (
            <>
              <View style={s.buttonCont}>
                <Button
                  onPress={onPressLeft}
                  style={[
                    {
                      borderWidth: 1,
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 8,
                    },
                    s.leftButton,
                  ]}
                >
                  <TextItem type="bold14Main">{leftLabel}</TextItem>
                </Button>
              </View>
              <View style={s.buttonCont}>
                <Button
                  onPress={onPressRight}
                  style={[
                    s.rightButton,
                    {
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 8,
                    },
                  ]}
                >
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

const styles = () =>
  StyleSheet.create({
    touchArea: { width: "100%", height: "100%" },
    blackBackground: {
      width,
      height,
      backgroundColor: "#0008",
      position: "absolute",
    },
    bgScreen: { width, height, backgroundColor: "#000" },
    buttonsCont: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: sp.sm,
    },
    buttonText: {
      fontSize: 20,
      textAlign: "center",
    },
    rightButton: {
      marginLeft: sp.ss,
      backgroundColor: cp.main,
    },
    leftButton: {
      borderColor: cp.main,
      marginRight: sp.ss,
    },
    buttonCont: { flex: 1, height: 50 },
    titleText: {
      color: cp.text1,
      fontSize: 16,
      marginBottom: sp.ss,
      fontWeight: "bold",
    },
    imageGroup: {
      alignItems: "center",
      paddingHorizontal: sp.sm,
      marginBottom: 32,
    },
    closeCont: {
      elevation: 1,
      width: 24,
      height: 24,
      backgroundColor: cp.white0,
      borderRadius: 24,
      marginBottom: sp.ss,
      justifyContent: "center",
      alignItems: "center",
    },
    contentCont: {
      width,
      backgroundColor: cp.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingTop: sp.sm,
      paddingHorizontal: sp.sm,
      paddingBottom: sp.l,
    },
    emptyCont: {
      width,
      height,
      position: "absolute",
      justifyContent: "flex-end",
      bottom: 0,
    },
  });

export default StaticBottomSheet;
