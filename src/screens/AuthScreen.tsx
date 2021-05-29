import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { AppCanvas, Button, TextItem, TextField } from "../components";
import { heightAdapt, widthPercent } from "../config";
import { pages as p, spacing as sp, fancyStates as fan } from "../constants";
import auth from "@react-native-firebase/auth";
import { FieldErrorProps, FancyTypes } from "../config/types";
import { loggingIn } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import AppState from "../redux";
import SplashScreen from "react-native-splash-screen";

interface AuthProps {
  navigation: CompositeNavigationProp<any, any>;
}
const AuthScreen: FC<AuthProps> = ({ navigation }) => {
  const { defaultState, fancyType } = fan;
  const dispatch = useDispatch();
  const { sessionReducer } = useSelector((state: AppState) => state);

  const [fancyBarState, setFancyBarState] = useState<FancyTypes>(defaultState);

  const [formError, setFormError] = useState<FieldErrorProps[]>([]);

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const changeAuth = () => {
    setFormError([]);
    setIsLogin((current) => !current);
  };

  const firebaseLogin = async () => {
    try {
      const data = isLogin
        ? await auth().signInWithEmailAndPassword(email, password)
        : await auth().createUserWithEmailAndPassword(email, password);

      if (data?.user) {
        const { uid, displayName, email } = data?.user;
        dispatch(
          loggingIn({ uid, displayName: displayName || "", email: email || "" })
        );
        navigation.navigate(p.HomeScreen);
        return;
      }
      // CONDITION IF FALSE
      setFancyBarState({
        visible: true,
        type: fancyType.failed,
        msg: "Telah terjadi kesalahan, coba beberapa saat lagi",
      });
      setIsLoading(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      setIsLoading(false);
      if (error.code == "auth/wrong-password") {
        return setFormError((current) => [
          ...current,
          { param: "password", msg: "Kata sandi tidak cocok", value: password },
        ]);
      }
      if (error.code == "auth/user-not-found") {
        return setFormError((current) => [
          ...current,
          { param: "email", msg: "Alamat email belum terdaftar", value: email },
        ]);
      }
      if (error.code == "auth/email-already-in-use") {
        return setFormError((current) => [
          ...current,
          { param: "email", msg: "Alamat email tidak tersedia", value: email },
        ]);
      }
    }
  };

  const checkForm = () => {
    if (email == "") {
      setFormError((current) => [
        ...current,
        { param: "email", msg: "Harap isi alamat email", value: email },
      ]);
      setIsLoading(false);
      return;
    }
    if (password == "") {
      setFormError((current) => [
        ...current,
        { param: "password", msg: "Harap isi kata sandi", value: password },
      ]);
      setIsLoading(false);
      return;
    }
    firebaseLogin();
  };

  const processing = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    setFormError([]);
    checkForm();
  };

  const testError = (field: string) => {
    if (!formError) return false;

    const index = formError.findIndex(
      (error: FieldErrorProps) => error.param == field
    );

    if (index == -1) return false;

    return formError[index].msg;
  };

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user !== null) {
      const { uid, displayName, email } = user;
      dispatch(loggingIn({ uid, displayName, email }));
    }
    SplashScreen.hide();
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AppCanvas {...{ fancyBarState, setFancyBarState }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TextItem type="logo" style={{ marginBottom: heightAdapt(24) }}>
          SCHumanBank
        </TextItem>
        <TextField
          placeholder="email"
          containerStyle={{ width: widthPercent(80), marginBottom: sp.sm }}
          onChangeText={(e) => setEmail(e)}
          defaultValue={email}
          warningText={testError("email")}
          isError={testError("email")}
        />
        <TextField
          placeholder="kata sandi"
          secureTextEntry
          containerStyle={{ width: widthPercent(80), marginBottom: sp.sm }}
          onChangeText={(e) => setPassword(e)}
          defaultValue={password}
          warningText={testError("password")}
          isError={testError("password")}
        />
        <Button
          styleKey="widthRelativeColored"
          style={{ marginBottom: heightAdapt(16) }}
          onPress={processing}
          disabled={isLoading}
          isLoading={isLoading}
        >
          <TextItem type="normal20White">
            {isLogin ? "Masuk" : "Daftar"}
          </TextItem>
        </Button>
        <Button onPress={changeAuth} disabled={isLoading}>
          <TextItem type="normal12Main">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
          </TextItem>
        </Button>
      </View>
    </AppCanvas>
  );
};

export default AuthScreen;
