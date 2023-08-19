import { ColorPicker as ColorPickerReact, useColor } from "react-color-palette";
import "react-color-palette/css";

type Props = {
  color?: string;
  onChange: (color: string) => void;
};

export default function ColorPicker({ color, onChange }: Props) {
  const [innerColor, setInnerColor] = useColor(color ?? "#000000");

  return (
    <div className="w-48">
      <ColorPickerReact
        color={innerColor}
        onChange={(color) => {
          setInnerColor(color);

          onChange(color.hex);
        }}
        hideInput
      />
    </div>
  );
}
