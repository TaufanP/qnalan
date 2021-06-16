import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { MainRoute, AuthRoute } from "./routes";
import { useSelector } from "react-redux";
import AppState from "./redux";
import { LogBox } from "react-native";

const Root: FC = () => {
  const { sessionReducer } = useSelector((state: AppState) => state);

  LogBox.ignoreLogs(["Reanimated 2", "getNode()"]);

  const { uid } = sessionReducer;
  return (
    <NavigationContainer>
      {uid == "" ? <AuthRoute /> : <MainRoute />}
    </NavigationContainer>
  );
};

export default Root;
