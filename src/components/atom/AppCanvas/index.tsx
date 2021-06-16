import { CompositeNavigationProp } from "@react-navigation/core";
import React, { FC, PropsWithChildren } from "react";
import { Image, StatusBar, View } from "react-native";
import { DefaultBg, HomeBg } from "../../../../assets";
import { heightPercent, widthPercent } from "../../../config";
import { FancyTypes, StaticBottomSheetProps } from "../../../config/types";
import StaticBottomSheet from "../../organism/StaticBottomSheet";
import AppHeader from "../AppHeader";
import FancyBar from "../FancyBar";
import styles from "./styles";

interface AppCanvasProps {
  navigation?: CompositeNavigationProp<any, any>;
  fancyBarState?: FancyTypes;
  setFancyBarState?: any;
  header?: () => JSX.Element;
  staticBottomSheetState?: StaticBottomSheetProps;
  homeBg?: boolean;
}

const AppCanvas: FC<PropsWithChildren<AppCanvasProps>> = ({
  children,
  fancyBarState,
  setFancyBarState,
  header,
  staticBottomSheetState,
  homeBg = false,
}) => {
  const s = styles();
  return (
    <View style={s.container}>
      <StatusBar backgroundColor={"#449CDA"} barStyle="light-content" />
      <View
        style={{
          height: heightPercent(100),
          width: widthPercent(100),
          position: "absolute",
        }}
      >
        <Image
          source={homeBg ? HomeBg : DefaultBg}
          style={{ resizeMode: "cover", width: "100%", height: "100%" }}
        />
      </View>
      {header && <AppHeader>{header()}</AppHeader>}
      {children}
      <FancyBar {...{ fancyBarState, setFancyBarState }} />
      <StaticBottomSheet {...(staticBottomSheetState || { visible: false })} />
    </View>
  );
};

export default AppCanvas;
