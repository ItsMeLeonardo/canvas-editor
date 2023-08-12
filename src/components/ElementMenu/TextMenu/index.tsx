import Tippy from "@tippyjs/react";

import { useCanvasElements } from "../../../store/CanvasElements";
import ColorPicker from "../../ColorPicker";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Minus,
  Plus,
  Strikethrough,
  Underline,
} from "iconoir-react";
import {
  TextElement,
  UpdateTextElement,
} from "../../../store/CanvasElements/canvas-elements";

type Font = {
  label: string;
};

type Weight = {
  label: string;
};

const DEFAULT_FONTS: Font[] = [
  {
    label: "Roboto",
  },
  {
    label: "Open Sans",
  },
  {
    label: "Lato",
  },
  {
    label: "Montserrat",
  },
];

const DEFAULT_WEIGHTS: Weight[] = [
  {
    label: "Regular",
  },
  {
    label: "Medium",
  },
  {
    label: "Bold",
  },
  {
    label: "Black",
  },
];

export default function TextMenu() {
  const { updateElement, currentElement } = useCanvasElements();

  if (!currentElement) return null;

  const { color } = currentElement as TextElement;

  return (
    <section className="w-full p-4 flex flex-col gap-2">
      <h4 className="text-sm text-white font-bold">Text</h4>

      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center gap-4 justify-between relative">
          <span className="text-xs text-secondary w-[20%]">Font</span>
          <Tippy
            placement="bottom"
            interactive
            offset={[0, 5]}
            content={
              <div className="p-2  px-3 font-semibold text-xs bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl text-secondary w-44">
                {DEFAULT_FONTS.map((font) => (
                  <button
                    key={font.label}
                    className="flex items-center justify-between w-full text-xs text-white hover:bg-primary p-2 rounded-lg whitespace-nowrap"
                  >
                    <div className="flex gap-2 items-center font-normal">
                      <span className="text-sm">{font.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            }
          >
            <label className="flex-grow bg-background/50 rounded-lg text-white text-xs p-3 relative">
              Druk wide
            </label>
          </Tippy>
        </div>
        <div className="flex w-full items-center gap-4 justify-between">
          <span className="text-xs text-secondary w-[20%]">Weight</span>
          <Tippy
            placement="bottom"
            interactive
            offset={[0, 5]}
            content={
              <div className="p-2 px-3 font-semibold text-xs bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl text-secondary w-44">
                {DEFAULT_WEIGHTS.map((weight) => (
                  <button
                    key={weight.label}
                    className="flex items-center justify-between w-full text-xs text-white hover:bg-primary p-2 rounded-lg whitespace-nowrap"
                  >
                    <div className="flex gap-2 items-center font-normal">
                      <span className="text-sm">{weight.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            }
          >
            <label className="flex-grow bg-background/50 rounded-lg text-white text-xs p-3">
              Black
            </label>
          </Tippy>
        </div>
        <div className="flex w-full items-center gap-4 justify-between">
          <span className="text-xs text-secondary w-[20%]">Size</span>
          <div className="flex gap-2">
            <button className="p-2 bg-secondary hover:bg-background/50 text-primary rounded-lg">
              <Plus />
            </button>

            <button className="p-2 bg-secondary hover:bg-background/50 text-primary rounded-lg">
              <Minus />
            </button>

            <label className="bg-background/50 rounded-lg text-white text-xs p-3">
              24
            </label>
          </div>
        </div>
        <div className="flex w-full items-center gap-4 justify-between">
          <span className="text-xs text-secondary w-[20%]">Spacing</span>
          <div className="flex gap-2">
            <button className="p-2 bg-secondary hover:bg-background/50 text-primary rounded-lg">
              <Plus />
            </button>

            <button className="p-2 bg-secondary hover:bg-background/50 text-primary rounded-lg">
              <Minus />
            </button>

            <label className="bg-background/50 rounded-lg text-white text-xs p-3">
              24
            </label>
          </div>
        </div>
        <div className="flex w-full items-center gap-4 justify-between">
          <span className="text-xs text-secondary w-[20%]">Color</span>

          <Tippy
            placement="left-end"
            trigger="click"
            interactive
            offset={[0, 5]}
            content={
              <div className="p-2 px-3 bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl">
                <ColorPicker
                  onInputChange={(color) => {
                    const shapeUpdate: UpdateTextElement = {
                      id: currentElement.id,
                      color,
                    };
                    updateElement(shapeUpdate);
                  }}
                />
              </div>
            }
          >
            <div
              className="bg-background/50 text-white text-xs block aspect-square w-10 rounded-lg"
              style={{ backgroundColor: color }}
            ></div>
          </Tippy>
        </div>
        <div className="flex w-full items-center gap-4 justify-between">
          <span className="text-xs text-secondary w-[20%]">Align</span>
          <div className="flex flex-grow items-center justify-end">
            <button className="p-2 hover:bg-primary text-primary rounded-lg">
              <AlignLeft />
            </button>
            <button className="p-2 hover:bg-primary text-primary rounded-lg">
              <AlignCenter />
            </button>
            <button className="p-2 hover:bg-primary text-primary rounded-lg">
              <AlignRight />
            </button>
            <button className="p-2 hover:bg-primary text-primary rounded-lg">
              <AlignJustify />
            </button>
          </div>
        </div>
        <div className="flex w-full items-center gap-4 justify-between">
          <span className="text-xs text-secondary w-[20%]">Style</span>
          <div className="flex flex-grow items-center justify-end">
            <button className="p-2 hover:bg-primary text-primary rounded-lg">
              <Bold />
            </button>
            <button className="p-2 hover:bg-primary text-primary rounded-lg">
              <Italic />
            </button>
            <button className="p-2 hover:bg-primary text-primary rounded-lg">
              <Underline />
            </button>
            <button className="p-2 hover:bg-primary text-primary rounded-lg">
              <Strikethrough />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
