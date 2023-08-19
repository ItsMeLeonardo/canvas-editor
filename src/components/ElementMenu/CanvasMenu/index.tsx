import Tippy from "@tippyjs/react";
import { useCanvasProperties } from "../../../store";
import ColorPicker from "../../ColorPicker";

export default function CanvasMenu() {
  const { backgroundColor, updateBackgroundColor } = useCanvasProperties();

  return (
    <section className="w-full p-4 flex flex-col gap-2">
      <h4 className="text-sm text-white font-bold">Work space</h4>

      <div className="flex w-full items-center gap-4 justify-between">
        <span className="text-xs text-secondary w-[30%]">Canvas Color</span>

        <Tippy
          placement="left-end"
          trigger="click"
          interactive
          offset={[0, 5]}
          content={
            <div className="p-2 px-3 bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl">
              <ColorPicker
                onChange={(color) => {
                  updateBackgroundColor(color);
                }}
              />
            </div>
          }
        >
          <div
            className="bg-background/50 text-white text-xs block aspect-square w-10 rounded-lg"
            style={{ backgroundColor }}
          ></div>
        </Tippy>
      </div>
    </section>
  );
}
