import auth from "@react-native-firebase/auth";
import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import { AppCanvas, Button, TextField, TextItem } from "../components";
import { heightAdapt, widthPercent } from "../config";
import { db } from "../config/firebase";
import { FancyTypes, FieldErrorProps } from "../config/types";
import {
  fancyStates as fan,
  pages as p,
  spacing as sp,
  strings as str,
} from "../constants";
import AppState from "../redux";
import { loggingIn } from "../redux/actions";

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

  const changeAuth = () => {
    setFormError([]);
    setIsLogin((current) => !current);
  };

  const firebaseLogin = async () => {
    try {
      const data = isLogin
        ? await auth().signInWithEmailAndPassword(email, password)
        : await auth().createUserWithEmailAndPassword(email, password);

      setIsLoading(false);
      setEmail("");
      setPassword("");
      if (data?.user) {
        if (!isLogin && data?.additionalUserInfo?.isNewUser) {
          db.ref(`users/${data?.user?.uid}`).set({
            displayName: data?.user?.displayName || "",
            photoURL: data?.user?.photoURL || "",
            messages: {},
            email: data?.user?.email,
          });
        }
        const { uid, displayName, email, photoURL } = data?.user;
        dispatch(
          loggingIn({
            uid,
            displayName: displayName || "",
            email: email || "",
            photoURL: photoURL || "",
          })
        );
        navigation.navigate(p.DrawerRoute);
        return;
      }
      // CONDITION IF FALSE
      setFancyBarState({
        visible: true,
        type: fancyType.failed,
        msg: str.failedHappen,
      });
    } catch (error) {
      setIsLoading(false);
      if (error.code == "auth/wrong-password") {
        return setFormError((current) => [
          ...current,
          { param: "password", msg: str.passwordInvalid, value: password },
        ]);
      }
      if (error.code == "auth/user-not-found") {
        return setFormError((current) => [
          ...current,
          { param: "email", msg: str.emailNotExist, value: email },
        ]);
      }
      if (error.code == "auth/email-already-in-use") {
        return setFormError((current) => [
          ...current,
          { param: "email", msg: str.emailTaken, value: email },
        ]);
      }
    }
  };

  const checkForm = () => {
    if (email == "") {
      setFormError((current) => [
        ...current,
        { param: "email", msg: str.fillEmail, value: email },
      ]);
      setIsLoading(false);
      return;
    }
    if (password == "") {
      setFormError((current) => [
        ...current,
        { param: "password", msg: str.fillPassword, value: password },
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
    if (user !== null) {
      const { uid, displayName, email, photoURL } = user;
      dispatch(loggingIn({ uid, displayName, email, photoURL }));
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
          placeholder={str.email}
          containerStyle={{ width: widthPercent(80), marginBottom: sp.sm }}
          onChangeText={(e) => setEmail(e)}
          defaultValue={email}
          warningText={testError("email")}
          isError={testError("email")}
          autoCapitalize={"none"}
        />
        <TextField
          placeholder={str.password}
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
            {isLogin ? str.login : str.register}
          </TextItem>
        </Button>
        {/* <Button onPress={test} disabled={isLoading}> */}
        <Button onPress={changeAuth} disabled={isLoading}>
          <TextItem type="normal12Main">
            {isLogin ? str.notHaveAcc : str.haveAcc}
          </TextItem>
        </Button>
      </View>
    </AppCanvas>
  );
};

export default AuthScreen;
