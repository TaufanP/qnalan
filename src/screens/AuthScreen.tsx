import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { BaseButton } from "react-native-gesture-handler";
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

  const processing = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const data = isLogin
        ? await auth().signInWithEmailAndPassword(email, password)
        : await auth().createUserWithEmailAndPassword(email, password);
      console.log({ data });
      setIsLoading(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
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
        />
        <TextField
          placeholder="kata sandi"
          secureTextEntry
          containerStyle={{ width: widthPercent(80), marginBottom: sp.sm }}
          onChangeText={(e) => setPassword(e)}
          defaultValue={password}
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
        <Button
          onPress={() => setIsLogin((current) => !current)}
          disabled={isLoading}
        >
          <TextItem type="normal12Main">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
          </TextItem>
        </Button>
      </View>
    </AppCanvas>
  );
};

export default AuthScreen;
