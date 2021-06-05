import {
  FilterDataProps,
  HobbyProps,
  StaticBottomSheetProps,
} from "../../config/types";

const batchValue = [...new Array(16)]
  .map((_, i) => ({ label: `${2005 + i}`, value: 2005 + i }))
  .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

const filterDataValue: FilterDataProps[] = [
  { label: "Angkatan", count: 0, value: 2000 },
  { label: "Gender", count: 0, value: 2001 },
  { label: "Hobi", count: 0, value: 2002 },
  { label: "Jurusan", count: 0, value: 2003 },
  { label: "Umur", count: 0, value: 2004 },
].sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

const genderValue = [
  { label: "Pria", value: 1 },
  { label: "Wanita", value: 2 },
];

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
].sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

const majorValue = [
  "Accounting",
  "Branding",
  "Business Economics",
  "Business",
  "Business Mathematics",
  "Computer Systems Engineering",
  "Digital Business Technology",
  "Event",
  "Finance",
  "Food Business Technology",
  "Hospitality Business",
  "International Business Law",
  "Product Design Engineering",
  "Renewable Energy Engineering",
].sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));

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

export {
  StaticBottomSheetValue,
  HobbiesValue,
  batchValue,
  genderValue,
  majorValue,
  filterDataValue,
};
