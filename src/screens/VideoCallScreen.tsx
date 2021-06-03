import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useRef } from "react";
import { Image, View } from "react-native";
import { ArrowBack, Plus } from "../../assets";
import { AppCanvas, Button, ButtonHeader } from "../components";
import { widthPercent } from "../config";
import { colorsPalette as cp, spacing as sp } from "../constants";
import { RNCamera } from "react-native-camera";
import { useSelector } from "react-redux";
import AppState from "../redux";

interface VideoCallScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const VideoCallScreen: FC<VideoCallScreenProps> = ({ navigation }) => {
  const {
    sessionReducer: { photoURL },
  } = useSelector((state: AppState) => state);
  const cameraRef = useRef(null);
  return (
    <AppCanvas>
      <RNCamera
        ref={cameraRef}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      />
      <ButtonHeader
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#0005",
          top: sp.sm,
          left: sp.sm,
          position: "absolute",
          borderRadius: 8,
        }}
      >
        <ArrowBack width={16} height={16} fill={cp.white} />
      </ButtonHeader>
      <View
        style={{
          height: 54,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          bottom: sp.l,
          width: widthPercent(100),
        }}
      >
        <Button
          style={{
            width: 54,
            height: 54,
            backgroundColor: cp.red1,
            borderRadius: 54,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <View style={{ transform: [{ rotate: "45deg" }] }}>
            <Plus />
          </View>
        </Button>
      </View>
      {photoURL?.length !== 0 && (
        <View
          style={{
            position: "absolute",
            width: widthPercent(30),
            height: (widthPercent(30) * 4) / 3,
            backgroundColor: "red",
            right: sp.sm,
            top: sp.sm,
          }}
        >
          <Image
            source={{ uri: photoURL }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      )}
    </AppCanvas>
  );
};

export default VideoCallScreen;
