import auth from "@react-native-firebase/auth";
import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { useDispatch } from "react-redux";
import { SettingIcon } from "../../../assets";
import { AppCanvas, CustomNav } from "../../components";
import { pages as p } from "../../constants";
import { loggingOut } from "../../redux/actions";

interface HomeProps {
  navigation: CompositeNavigationProp<any, any>;
}

const Home: FC<HomeProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = (user: any) => {
    if (user !== null) {
      SplashScreen.hide();
      return;
    }
    dispatch(loggingOut());
    navigation.reset({
      index: 0,
      routes: [{ name: p.Auth }],
    });
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AppCanvas homeBg>
      <SettingIcon
        style={{
          position: "absolute",
          top: -20,
          right: -20,
        }}
        width={140}
        height={140}
      />
      <CustomNav
        backPress={() => navigation.toggleDrawer()}
        chatPress={() => navigation.navigate(p.RoomList)}
      />
    </AppCanvas>
  );
};

export default Home;
