import Tippy from "@tippyjs/react";
import { Flare, FrameTool, Circle } from "iconoir-react";
import { ReactNode } from "react";
import { CreateShapeElement } from "../../store/CanvasElements/canvas-elements";
import { useCanvasElements } from "../../store/CanvasElements";

type Shape = {
  label: string;
  icon: ReactNode;
  type: "rect" | "circle";
};

const DEFAULT_SHAPES: Shape[] = [
  {
    label: "Square",
    icon: <FrameTool />,
    type: "rect",
  },
  {
    label: "Circle",
    icon: <Circle />,
    type: "circle",
  },
  /*   {
    label: "Square",
    icon: <Square />,
    type: "square",
  }, */
];
export default function ShapeSubMenu() {
  const { addElement } = useCanvasElements();

  return (
    <Tippy
      placement="right"
      offset={[0, 15]}
      delay={[10, 10]}
      interactive
      content={
        <div className="p-2 px-3 bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl font-semibold text-xs  text-secondary w-48">
          <header className="whitespace-nowrap mb-4">
            <h4 className="font-semibold text-sm">Choose a shape</h4>
          </header>
          {DEFAULT_SHAPES.map((shape) => (
            <button
              key={shape.label}
              className="flex items-center gap-4 w-full text-xs text-white hover:bg-primary p-2 rounded-lg whitespace-nowrap"
              onClick={() => {
                const shapeWidth = 150;
                const shapeHeight = 150;

                const x = window.innerWidth / 2 - shapeWidth / 2;
                const y = window.innerHeight / 2 - shapeHeight / 2;

                const newShape: CreateShapeElement = {
                  type: "shape",
                  shapeType: shape.type,
                  width: shapeWidth,
                  height: shapeHeight,
                  fill: "#fff",
                  stroke: "#000",
                  strokeWidth: 1,
                  x,
                  y,
                  draggable: true,
                };
                addElement(newShape);
              }}
            >
              <span>{shape.icon}</span>
              <span>{shape.label}</span>
            </button>
          ))}
        </div>
      }
    >
      <button className="p-2 hover:bg-primary text-primary rounded-lg">
        <Flare />
      </button>
    </Tippy>
  );
}
