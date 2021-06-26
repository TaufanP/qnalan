const schema = "com.sbhumanbank";
import { pages as p } from "../../constants";

/*
SCREENS:
[PAGE.MY_COUPONS]: my-coupons
[PAGE.PRODUCT_DETAIL]: product/:id
[PAGE.CATEGORY_DETAIL]: category/:id/:categories_name
[PAGE.MERCHANT_DETAIL]: store/:merchant_account_id/:section?
*/

const config = {
  screens: {
    initialRouteName: p.DrawerRoute,
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
