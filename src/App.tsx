import Tippy from "@tippyjs/react";

import {
  AlignCenter,
  AlignHorizontalCenters,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalCenters,
  Bold,
  CompAlignBottom,
  CompAlignLeft,
  CompAlignRight,
  CompAlignTop,
  Underline,
  Italic,
  Minus,
  Plus,
  Strikethrough,
} from "iconoir-react";
import { Stage, Layer, Transformer, Rect } from "react-konva";
import Konva from "konva";

import ColorPicker from "./components/ColorPicker";
import Navbar from "./components/Navbar";
import FloatMenu from "./components/FloatMenu";
import ZoomOptions from "./components/ZoomOptions";
import SidebarMenu from "./components/SidebarMenu";
import { useCanvasProperties } from "./store";
import ContextMenu from "./components/ContextMenu";
import { CANVAS_HEADER_HEIGHT } from "./constants/canvas-layout";
import { useEffect, useRef, useState } from "react";
import ImageFromUrl from "./components/ImageFromUrl";

import { useCanvasElements } from "./store/CanvasElements";
import RenderShape from "./components/RenderShape";

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

type CanvasSize = {
  width: number;
  height: number;
};

export default function App() {
  const { height, backgroundColor, width, updateBackgroundColor, zoom } =
    useCanvasProperties();

  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: window.innerWidth,
    height: window.innerHeight - CANVAS_HEADER_HEIGHT,
  });

  const { images, shapes, removeElement, currentElement, setCurrentElement } =
    useCanvasElements();

  const transformerRef = useRef<Konva.Transformer>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const pointer = stage.getPointerPosition();

    if (!pointer) return;

    const valueZoom = zoom / 100;

    stage.scale({ x: valueZoom, y: valueZoom });

    const newPos = {
      x: valueZoom,
      y: valueZoom,
    };
    stage.position(newPos);
  }, [zoom]);

  useEffect(() => {
    const handleWindowResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight - CANVAS_HEADER_HEIGHT,
      });
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const canvasWidth = canvasSize.width;
  const canvasHeight = canvasSize.height;

  useEffect(() => {
    const stage = stageRef.current;
    const layer = layerRef.current;
    const transformer = transformerRef.current;

    if (!stage || !layer || !transformer || !currentElement) return;

    const handleDeselect = (e: Konva.KonvaEventObject<MouseEvent>) => {
      const clickedOnEmpty = e.target === e.target.getStage();

      if (clickedOnEmpty) {
        setCurrentElement(null);
      }
    };

    const currentNode = layer.findOne(`#${currentElement.id}`);

    if (!currentNode) return;
    transformer.nodes([currentNode]);

    stage.on("click", handleDeselect);
    layer.on("click", handleDeselect);

    return () => {
      stage.off("click", handleDeselect);
      layer.off("click", handleDeselect);
      transformer.nodes([]);
    };
  }, [currentElement, setCurrentElement]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-background">
      <Navbar />

      <div className="relative h-content w-full grid place-content-center overflow-auto">
        <Stage
          width={canvasWidth}
          height={canvasHeight}
          draggable
          ref={stageRef}
          onWheel={(e) => {
            // stop default scrolling
            e.evt.preventDefault();
            const stage = stageRef.current;
            if (!stage) return;

            const scaleBy = 1.05;

            const oldScale = stage.scaleX();
            const pointer = stage.getPointerPosition();

            if (!pointer) return;

            const mousePointTo = {
              x: (pointer.x - stage.x()) / oldScale,
              y: (pointer.y - stage.y()) / oldScale,
            };

            // how to scale? Zoom in? Or zoom out?
            let direction = e.evt.deltaY > 0 ? 1 : -1;

            // when we zoom on trackpad, e.evt.ctrlKey is true
            // in that case lets revert direction
            if (e.evt.ctrlKey) {
              direction = -direction;
            }

            const newScale =
              direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

            stage.scale({ x: newScale, y: newScale });

            const newPos = {
              x: pointer.x - mousePointTo.x * newScale,
              y: pointer.y - mousePointTo.y * newScale,
            };
            stage.position(newPos);
          }}
        >
          <Layer ref={layerRef}>
            <Rect
              height={height}
              width={width}
              x={(canvasWidth - width) / 2}
              y={(canvasHeight - height) / 2}
              fill={backgroundColor}
            />
            {shapes.map((shape) => (
              <RenderShape
                key={shape.id}
                shape={shape}
                onClick={() => {
                  setCurrentElement(shape.id);
                }}
              />
            ))}

            {images.map((image) => (
              <ImageFromUrl
                key={image.id}
                {...image}
                onClick={() => {
                  setCurrentElement(image.id);
                }}
                onDblClick={() => {
                  removeElement(image.id);
                }}
              />
            ))}

            <Transformer ref={transformerRef}></Transformer>
          </Layer>
        </Stage>
        <SidebarMenu />
        <ContextMenu />

        <ZoomOptions />
        <FloatMenu className="right-4 flex flex-col top-4 rounded-xl w-designTools p-0">
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
        </FloatMenu>
      </div>
    </div>
  );
}
