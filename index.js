/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";
import { Linking } from "react-native";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log(remoteMessage);
});

messaging().onNotificationOpenedApp((message) => {
  console.log({ data: message.data });
  return Linking.openURL(message.data.linking);
});

AppRegistry.registerComponent(appName, () => App);
