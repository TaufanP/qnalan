import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { AppCanvas } from "../components";

interface HomeScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  return <AppCanvas></AppCanvas>;
};

export default HomeScreen;
