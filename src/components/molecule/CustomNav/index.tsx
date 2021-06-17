import React from "react";
import { View } from "react-native";
import {
  AddUserIcon,
  BackIcon,
  ChatIcon,
  ConsoleIcon,
  Plus,
} from "../../../../assets";
import { Button } from "../../atom";
import styles from "./styles";

interface CustomNavProps {
  backPress?: any;
  chatPress?: any;
  plusPress?: any;
  addUserPress?: any;
  consolePress?: any;
}

const CustomNav = ({
  backPress = () => console.log("test"),
  chatPress = () => console.log("test"),
  plusPress = () => console.log("test"),
  addUserPress = () => console.log("test"),
  consolePress = () => console.log("test"),
}: CustomNavProps) => {
  const s = styles();

  return (
    <View style={s.container}>
      <Button style={s.buttonCont} onPress={backPress}>
        <BackIcon width={160} height={160} style={{ left: -4 }} />
      </Button>
      <Button style={s.buttonCont} onPress={chatPress}>
        <ChatIcon width={140} height={140} style={{ top: 4 }} />
      </Button>
      <Button style={s.specialButtonCont} onPress={plusPress}>
        <Plus fill="#FFF" width={32} height={32} />
      </Button>
      <Button style={s.buttonCont} onPress={addUserPress}>
        <AddUserIcon width={200} height={200} style={{ top: 24 }} />
      </Button>
      <Button style={s.buttonCont} onPress={consolePress}>
        <ConsoleIcon width={160} height={160} />
      </Button>
    </View>
  );
};

export default CustomNav;
