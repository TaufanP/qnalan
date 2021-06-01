import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC } from "react";
import { AppCanvas } from "../components";

interface ProfileScreenProps {
  navigation: CompositeNavigationProp<any, any>;
}
const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  return <AppCanvas></AppCanvas>;
};

export default ProfileScreen;
