import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { MainRoute, AuthRoute } from "./routes";
import { useSelector } from "react-redux";
import AppState from "./redux";

const Root: FC = () => {
  const { sessionReducer } = useSelector((state: AppState) => state);

  const { uid } = sessionReducer;

  return (
    <NavigationContainer>
      <MainRoute />
      {/* {uid == "" ? <AuthRoute /> : <MainRoute />} */}
    </NavigationContainer>
  );
};

export default Root;
