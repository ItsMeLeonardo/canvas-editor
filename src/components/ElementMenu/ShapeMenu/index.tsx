import Tippy from "@tippyjs/react";
import { Minus, Plus } from "iconoir-react";
import ColorPicker from "../../ColorPicker";
import { useCanvasElements } from "../../../store/CanvasElements";
import {
  ShapeElement,
  UpdateShapeElement,
} from "../../../store/CanvasElements/canvas-elements";

export default function ShapeMenu() {
  const { currentElement, updateElement } = useCanvasElements();

  if (!currentElement) return null;

  const { fill, strokeWidth, stroke } = currentElement as ShapeElement;

  return (
    <section className="w-full p-4 flex flex-col gap-2">
      <h4 className="text-sm text-white font-bold">Shape</h4>

      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center gap-4 justify-between">
          <span className="text-xs text-secondary w-[30%]">Stroke width</span>
          <div className="flex gap-2">
            <button
              className="p-2 bg-secondary hover:bg-background/50 text-primary rounded-lg"
              onClick={() => {
                const updatedShape: UpdateShapeElement = {
                  strokeWidth: strokeWidth ? strokeWidth + 1 : 1,
                  id: currentElement.id,
                };

                updateElement(updatedShape);
              }}
            >
              <Plus />
            </button>

            <button
              className="p-2 bg-secondary hover:bg-background/50 text-primary rounded-lg"
              onClick={() => {
                const updatedShape: UpdateShapeElement = {
                  strokeWidth: strokeWidth ? strokeWidth - 1 : 0,
                  id: currentElement.id,
                };

                updateElement(updatedShape);
              }}
            >
              <Minus />
            </button>

            <label className="bg-background/50 rounded-lg text-white text-xs h-10 aspect-square flex items-center justify-center">
              {strokeWidth ?? 0}
            </label>
          </div>
        </div>

        <div className="flex w-full items-center gap-4 justify-between">
          <span className="text-xs text-secondary w-[20%]">Stroke color </span>

          <Tippy
            placement="left-end"
            trigger="click"
            interactive
            offset={[0, 5]}
            content={
              <div className="p-2 px-3 bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl">
                <ColorPicker
                  onInputChange={(color) => {
                    const updatedShape: UpdateShapeElement = {
                      stroke: color,
                      id: currentElement.id,
                    };

                    updateElement(updatedShape);
                  }}
                />
              </div>
            }
          >
            <div
              className="bg-background/50 text-white text-xs block aspect-square w-10 rounded-lg"
              style={{ backgroundColor: stroke }}
            ></div>
          </Tippy>
        </div>
        <div className="flex w-full items-center gap-4 justify-between">
          <span className="text-xs text-secondary w-[20%]">Fill </span>

          <Tippy
            placement="left-end"
            trigger="click"
            interactive
            offset={[0, 5]}
            content={
              <div className="p-2 px-3 bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl">
                <ColorPicker
                  onInputChange={(color) => {
                    const updatedShape: UpdateShapeElement = {
                      id: currentElement.id,
                      fill: color,
                    };

                    updateElement(updatedShape);
                  }}
                />
              </div>
            }
          >
            <div
              className="bg-background/50 text-white text-xs block aspect-square w-10 rounded-lg"
              style={{ backgroundColor: fill }}
            ></div>
          </Tippy>
        </div>
      </div>
    </section>
  );
}
