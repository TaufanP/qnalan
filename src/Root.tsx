import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { MainRoute } from "./routes";

const Root: FC = () => {
  return (
    <NavigationContainer>
      <MainRoute />
    </NavigationContainer>
  );
};

export default Root;
