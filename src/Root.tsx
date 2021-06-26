import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { LogBox } from "react-native";
import { useSelector } from "react-redux";
import AppState from "./redux";
import { AuthRoute, MainRoute } from "./routes";

const Root: FC = () => {
  const {
    sessionReducer: { uid },
  } = useSelector((state: AppState) => state);

  LogBox.ignoreLogs(["Reanimated 2", "getNode()"]);

  return (
    <NavigationContainer>
      {uid == "" ? <AuthRoute /> : <MainRoute />}
    </NavigationContainer>
  );
};

export default Root;
