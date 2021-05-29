import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect } from "react";
import { AppCanvas, HomeHeader } from "../components";
import SplashScreen from "react-native-splash-screen";
import auth from "@react-native-firebase/auth";

interface HomeScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const onAuthStateChanged = (user: any) => {
    if (user !== null) {
      SplashScreen.hide();
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return <AppCanvas header={() => <HomeHeader />}></AppCanvas>;
};

export default HomeScreen;
