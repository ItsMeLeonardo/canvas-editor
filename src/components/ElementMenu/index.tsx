import {
  AlignHorizontalCenters,
  AlignVerticalCenters,
  CompAlignBottom,
  CompAlignLeft,
  CompAlignRight,
  CompAlignTop,
} from "iconoir-react";

import FloatMenu from "../FloatMenu";
import { useCanvasElements } from "../../store/CanvasElements";
import ShapeMenu from "./ShapeMenu";
import TextMenu from "./TextMenu";
import CanvasMenu from "./CanvasMenu";

export default function ElementMenu() {
  const { currentElement } = useCanvasElements();

  return (
    <FloatMenu className="right-4 flex flex-col top-4 rounded-xl w-designTools p-0">
      {!currentElement && <CanvasMenu />}

      {currentElement && (
        <section className="w-full p-4 flex flex-col gap-2 border-b-background border-b">
          <h4 className="text-sm text-white font-bold">Align</h4>

          <div className="flex gap-2 bg-background/50 rounded-md p-1.5 justify-evenly">
            <button className="p-1.5 hover:bg-primary text-primary rounded-md text-sm">
              <CompAlignLeft />
            </button>
            <button className="p-1.5 hover:bg-primary text-primary rounded-md text-sm">
              <AlignHorizontalCenters />
            </button>
            <button className="p-1.5 hover:bg-primary text-primary rounded-md text-sm">
              <CompAlignRight />
            </button>
            <button className="p-1.5 hover:bg-primary text-primary rounded-md text-sm">
              <CompAlignTop />
            </button>
            <button className="p-1.5 hover:bg-primary text-primary rounded-md text-sm">
              <AlignVerticalCenters />
            </button>
            <button className="p-1.5 hover:bg-primary text-primary rounded-md text-sm">
              <CompAlignBottom />
            </button>
          </div>
        </section>
      )}

      {currentElement?.type === "shape" && <ShapeMenu />}

      {currentElement?.type === "text" && <TextMenu />}
    </FloatMenu>
  );
}
