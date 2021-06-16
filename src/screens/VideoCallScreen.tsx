import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useRef, useState } from "react";
import { Image, View, StyleSheet, ViewStyle } from "react-native";
import { ArrowBack, Plus, Swap } from "../../assets";
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

  const [isFront, setIsFront] = useState<boolean>(true);

  const cameraRef = useRef(null);

  const s = styles();

  return (
    <AppCanvas>
      <RNCamera
        ref={cameraRef}
        style={s.cameraCont}
        type={RNCamera.Constants.Type[isFront ? "front" : "back"]}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      />
      <ButtonHeader onPress={() => navigation.goBack()} style={s.backCont}>
        <ArrowBack width={16} height={16} fill={cp.white} />
      </ButtonHeader>
      <View style={s.buttonsCont}>
        <Button
          style={[s.closeButton, { marginRight: sp.sm, opacity: 0 }]}
          onPress={() => navigation.goBack()}
          disabled={true}
        >
          <View style={{ transform: [{ rotate: "45deg" }] }}>
            <Plus />
          </View>
        </Button>
        <Button style={[s.closeButton]} onPress={() => navigation.goBack()}>
          <View style={{ transform: [{ rotate: "45deg" }] }}>
            <Plus />
          </View>
        </Button>
        <Button
          style={[s.swapButton, { marginLeft: sp.sm }]}
          onPress={() => setIsFront((current) => !current)}
        >
          <Swap fill={cp.white} width={20} height={20} />
        </Button>
      </View>
      {photoURL?.length !== 0 && (
        <View style={s.ownVideoCont}>
          <Image source={{ uri: photoURL }} style={s.imageProfile} />
        </View>
      )}
    </AppCanvas>
  );
};

export default VideoCallScreen;

const styles = () => {
  const base = 54;
  const baseButton: ViewStyle = {
    width: base,
    height: base,
    borderRadius: base,
    justifyContent: "center",
    alignItems: "center",
  };
  return StyleSheet.create({
    imageProfile: { width: "100%", height: "100%" },
    ownVideoCont: {
      position: "absolute",
      width: widthPercent(30),
      height: (widthPercent(30) * 4) / 3,
      backgroundColor: "red",
      right: sp.sm,
      top: sp.sm,
    },
    swapButton: { ...baseButton, backgroundColor: "#0005" },
    closeButton: { ...baseButton, backgroundColor: cp.red1 },
    buttonsCont: {
      height: base,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      bottom: sp.l,
      width: widthPercent(100),
      flexDirection: "row",
    },
    backCont: {
      backgroundColor: "#0005",
      top: sp.sm,
      left: sp.sm,
      position: "absolute",
      borderRadius: 8,
    },
    cameraCont: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
  });
};
