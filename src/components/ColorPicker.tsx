import { useEffect, useRef } from "react";

import Iro from "@jaames/iro";

type ColorPickerEvent = {
  onColorChange?: (color: string) => void;
  onInputChange?: (color: string) => void;
};

type ColorPickerProps = {
  color?: string;
} & ColorPickerEvent;

type RGB = {
  r: number;
  g: number;
  b: number;
};

type RGBA = RGB & {
  a: number;
};

type HSL = {
  h: number;
  s: number;
  l: number;
};

type HSLA = HSL & {
  a: number;
};

type HSV = {
  h: number;
  s: number;
  v: number;
};

type HSVA = HSV & {
  a: number;
};

type ColorObject = {
  hexString: string;
  hex8String: string;
  rgb: RGB;
  rgba: RGBA;
  rgbString: string;
  rgbaString: string;
  hsl: HSL;
  hsla: HSLA;
  hslString: string;
  hslaString: string;
  hsv: HSV;
  hsva: HSVA;
  red: number;
  green: number;
  blue: number;
  alpha: number;
  hue: number;
  saturation: number;
  value: number;
  kelvin: number;
};

export default function ColorPicker(props: ColorPickerProps) {
  const { color = "#fff", onColorChange, onInputChange } = props;

  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const colorPicker = colorPickerRef.current;

    if (!colorPicker) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const colorPickerInstance = new Iro.ColorPicker(colorPicker, {
      width: 240,
      height: 240,
      color,
      layout: [
        {
          component: Iro.ui.Slider,
          options: {
            // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
            sliderType: "alpha",
          },
        },
        {
          component: Iro.ui.Wheel,
          options: {
            wheelLightness: false,
          },
        },
      ],
    });

    if (onColorChange) {
      colorPickerInstance.on("input:end", (e: ColorObject) => {
        onColorChange(e.hexString);
      });
    }

    if (onInputChange) {
      colorPickerInstance.on("color:change", (e: ColorObject) => {
        onInputChange(e.hexString);
      });
    }

    return () => {
      if (onColorChange) colorPickerInstance.off("input:end");
      if (onInputChange) colorPickerInstance.off("color:change");

      colorPickerInstance.destroy();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div ref={colorPickerRef}></div>;
}
