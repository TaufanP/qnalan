import { HobbyProps, StaticBottomSheetProps } from "../../config/types";

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

const HobbiesValue: HobbyProps[] = [
  {
    label: "Art",
    id: 1000,
    isSelected: false,
  },
  {
    label: "Creative",
    id: 1100,
    isSelected: false,
  },
  {
    label: "Religion",
    id: 1110,
    isSelected: false,
  },
  {
    label: "Social",
    id: 1111,
    isSelected: false,
  },
  {
    label: "Sports",
    id: 1112,
    isSelected: false,
  },
];

export { StaticBottomSheetValue, HobbiesValue };
