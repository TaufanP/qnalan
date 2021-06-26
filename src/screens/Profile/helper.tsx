import Picker from "@gregfrench/react-native-wheel-picker";
import React from "react";
import ImageResizer from "react-native-image-resizer";
import { widthPercent } from "../../config";
import { colorsPalette as cp } from "../../constants";

const imageResizer = (src: string, thenCallback: any, catchCallback: any) => {
  ImageResizer.createResizedImage(
    src,
    900,
    900,
    "PNG",
    100,
    0,
    undefined,
    undefined
  )
    .then(thenCallback)
    .catch(catchCallback);
};

const pickerGenerator = (
  array: any[],
  setter: any,
  selected: number,
  fontSize: number
) => (
  <Picker
    style={{ width: widthPercent(80), height: 180 }}
    lineColor="#000000" //to set top and bottom line color (Without gradients)
    lineGradientColorFrom="#000000" //to set top and bottom starting gradient line color
    lineGradientColorTo="#000000" //to set top and bottom ending gradient
    selectedValue={selected}
    itemStyle={{ color: cp.text1, fontSize }}
    onValueChange={(index) => setter(array[index])}
  >
    {array.map((value, i) => (
      <Picker.Item label={value} value={i} key={i} />
    ))}
  </Picker>
);

export { pickerGenerator, imageResizer };
