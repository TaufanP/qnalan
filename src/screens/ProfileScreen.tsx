import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ViewStyle,
  Keyboard,
} from "react-native";
import { User } from "../../assets";
import {
  AppCanvas,
  Button,
  DefaultHeader,
  ProfilePhoto,
  TextField,
  TextItem,
} from "../components";
import { db, requestCameraPermission, widthPercent } from "../config";
import {
  colorsPalette as cp,
  node as n,
  spacing as sp,
  strings as str,
  fancyStates as fan,
} from "../constants";
import auth from "@react-native-firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import AppState from "../redux";
import { FancyTypes, FieldErrorProps } from "../config/types";
import { updateProfile } from "../redux/actions";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
interface ProfileScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { defaultState, fancyType } = fan;

  const {
    sessionReducer: { uid },
  } = useSelector((state: AppState) => state);

  const [fancyBarState, setFancyBarState] = useState<FancyTypes>(defaultState);

  const [displayName, setDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [uri, setUri] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formError, setFormError] = useState<FieldErrorProps[]>([]);

  const isMounted = useRef(true);

  const s = styles();

  const onPressCamera = async () => {
    const isGranted = await requestCameraPermission();
    if (isGranted)
      launchCamera(
        {
          mediaType: "photo",
        },
        (response) => {
          // setVisible(false);
          if (!response.didCancel) {
            setUri(response.assets[0].uri || "");
          }
        }
      );
  };

  const onPressLibrary = () =>
    launchImageLibrary(
      {
        mediaType: "photo",
      },
      (response) => {
        // setVisible(false);
        if (!response.didCancel) {
          setUri(response.assets[0].uri || "");
        }
      }
    );

  const header = useCallback(
    () => <DefaultHeader title="Profil" onPress={() => navigation.goBack()} />,
    []
  );

  const submit = async () => {
    setIsLoading(true);
    try {
      auth()
        .currentUser?.updateProfile({ displayName })
        .then(() => dispatch(updateProfile({ displayName })));
      db.ref(`${n.users}/${uid}`).update({ bio, displayName });
      setIsLoading(false);
      setFancyBarState({
        visible: true,
        type: fancyType.success,
        msg: "Berhasil memperbarui profil",
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setFancyBarState({
        visible: true,
        type: fancyType.failed,
        msg: "Terjadi kesalahan, coba kembali beberapa saat lagi",
      });
    }
  };

  const checkForm = () => {
    if (displayName.length == 0)
      return setFormError((current) => [
        ...current,
        {
          msg: "Username tidak boleh kosong",
          param: "displayName",
          value: displayName,
        },
      ]);
    if (displayName.length < 6)
      return setFormError((current) => [
        ...current,
        {
          msg: "Username minimal 6 karakter",
          param: "displayName",
          value: displayName,
        },
      ]);
    submit();
  };

  const testError = (field: string) => {
    if (!formError) return false;

    const index = formError.findIndex(
      (error: FieldErrorProps) => error.param == field
    );

    if (index == -1) return false;

    return formError[index].msg;
  };

  const processForm = async () => {
    // const data = await storage().ref(`sbhumanbank/users/${uid}`).putFile(uri);
    // console.log(data);
    const data = await storage()
      .ref(`sbhumanbank/users/${uid}`)
      .getDownloadURL();
    console.log(data);
    // Keyboard.dismiss();
    // setFormError([]);
    // checkForm();
  };

  const fillForm = async () => {
    const profile = await db.ref(`${n.users}/${uid}`).once("value");
    const detail = profile.val();
    if (isMounted) {
      setDisplayName(detail?.displayName);
      setBio(detail?.bio);
    }
  };

  useEffect(() => {
    fillForm();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <AppCanvas {...{ fancyBarState, setFancyBarState, header }}>
      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ProfilePhoto onPress={onPressLibrary} uri={uri} />
        <TextField
          placeholder={str.username}
          containerStyle={s.field}
          onChangeText={(e) => setDisplayName(e)}
          warningText={testError("displayName")}
          isError={testError("displayName")}
          defaultValue={displayName}
          maxLength={25}
        />
        <TextField
          placeholder={str.bio}
          containerStyle={s.field}
          onChangeText={(e) => setBio(e)}
          defaultValue={bio}
          maxLength={50}
        />
        <Button style={s.button} onPress={processForm} isLoading={isLoading}>
          <TextItem type="bold16White">PERBARUI</TextItem>
        </Button>
      </ScrollView>
    </AppCanvas>
  );
};

const styles = () =>
  StyleSheet.create({
    scroll: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: sp.l,
      paddingBottom: 64,
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: cp.main,
      borderRadius: 8,
      width: widthPercent(80),
      height: 48,
      marginTop: sp.l,
    },
    field: {
      width: widthPercent(80),
      backgroundColor: "transparent",
      borderBottomWidth: 2,
      borderBottomColor: cp.main,
    },
  });

export default ProfileScreen;
