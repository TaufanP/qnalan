import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect } from "react";
import { AppCanvas, ButtonFloat, EmptyState, HomeHeader } from "../components";
import SplashScreen from "react-native-splash-screen";
import auth from "@react-native-firebase/auth";
import { pages as p } from "../constants";
import { Plus } from "../../assets";

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

  return (
    <AppCanvas header={() => <HomeHeader />}>
      <EmptyState />
      <ButtonFloat onPress={() => navigation.navigate(p.ContactListScreen)}>
        <Plus />
      </ButtonFloat>
    </AppCanvas>
  );
};

export default HomeScreen;
