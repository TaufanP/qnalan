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
  TextField,
  TextItem,
} from "../components";
import { db, widthPercent } from "../config";
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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formError, setFormError] = useState<FieldErrorProps[]>([]);

  const isMounted = useRef(true);

  const s = styles();

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

  const processForm = () => {
    Keyboard.dismiss();
    setFormError([]);
    checkForm();
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
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: sp.l,
          paddingBottom: 64,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: widthPercent(30),
            height: widthPercent(30),
            borderRadius: widthPercent(30),
            borderColor: cp.main,
            borderWidth: 2,
            marginBottom: sp.l,
          }}
        >
          <User
            fill={cp.main}
            width={widthPercent(14)}
            height={widthPercent(14)}
          />
        </View>
        <TextField
          placeholder={str.username}
          containerStyle={s.field}
          onChangeText={(e) => setDisplayName(e)}
          warningText={testError("displayName")}
          isError={testError("displayName")}
          defaultValue={displayName}
        />
        <TextField
          placeholder={str.bio}
          containerStyle={s.field}
          onChangeText={(e) => setBio(e)}
          defaultValue={bio}
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
