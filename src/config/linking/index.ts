const schema = "com.sbhumanbank";
import { pages as p } from "../../constants";

const config = {
  screens: {
    initialRouteName: p.DrawerRoute,
    [p.RoomChat]: "room-chat/:partnerId/:roomId/:messageId",
    [p.DrawerRoute]: {
      screens: {
        [p.RoomList]: "room-list/:screen?/:uniqueId?/:firstData?",
        [p.Profile]: "profile",
      },
    },
  },
};

const linking = {
  prefixes: [`${schema}://app`],
  config,
};

export { linking };
