import { StaticBottomSheetProps } from "../../config/types";

const StaticBottomSheetValue: StaticBottomSheetProps = {
  onPressLeft: () => console.log("test"),
  onPressRight: () => console.log("test"),
  onPress: () => console.log("test"),
  visible: false,
  action: true,
  leftLabel: "leftLabel",
  rightLabel: "rightLabel",
  mainLabel: "mainLabel",
  mainTitle: "mainTitle",
  subTitle: "subTitle",
  setVisible: () => console.log("test"),
  // mainIcon: ()=,
};

export { StaticBottomSheetValue };
