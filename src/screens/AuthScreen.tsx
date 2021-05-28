import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { AppCanvas, Button, TextItem, TextField } from "../components";
import { heightAdapt, widthPercent } from "../config";
import { spacing as sp } from "../constants";
import auth from "@react-native-firebase/auth";
import { FieldErrorProps } from "../config/types";

interface AuthProps {
  navigation: CompositeNavigationProp<any, any>;
}
const AuthScreen: FC<AuthProps> = ({ navigation }) => {
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

  const processing = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    setFormError([]);
    try {
      const data = isLogin
        ? await auth().signInWithEmailAndPassword(email, password)
        : await auth().createUserWithEmailAndPassword(email, password);
      console.log({ data });
      setIsLoading(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.code);
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

  const testError = (field: string) => {
    if (!formError) return false;

    const index = formError.findIndex(
      (error: FieldErrorProps) => error.param == field
    );

    if (index == -1) return false;

    return formError[index].msg;
  };

  const onAuthStateChanged = (user: any) => {
    console.log({ user });
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AppCanvas>
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
