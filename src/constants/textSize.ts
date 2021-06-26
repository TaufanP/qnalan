import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const actuatedNormalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4.2;
  }
};

const textSize = {
  sss: actuatedNormalize(8),
  ss: actuatedNormalize(10),
  s: actuatedNormalize(12),
  default: actuatedNormalize(14),
  m: actuatedNormalize(16),
  l: actuatedNormalize(18),
  xl: actuatedNormalize(20),
  xxl: actuatedNormalize(24),
};

export default textSize;
