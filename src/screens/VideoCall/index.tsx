import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useRef, useState } from "react";
import { Image, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { useSelector } from "react-redux";
import { ArrowBack, Plus, Swap } from "../../../assets";
import { AppCanvas, Button, ButtonHeader } from "../../components";
import { colorsPalette as cp, spacing as sp } from "../../constants";
import AppState from "../../redux";
import styles from "./styles";

interface VideoCallProps {
  navigation: CompositeNavigationProp<any, any>;
}
const VideoCall: FC<VideoCallProps> = ({ navigation }) => {
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

export default VideoCall;
