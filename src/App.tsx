import { Stage, Layer, Transformer, Rect } from "react-konva";
import Konva from "konva";

import Navbar from "./components/Navbar";

import ZoomOptions from "./components/ZoomOptions";
import SidebarMenu from "./components/SidebarMenu";
import { useCanvasProperties } from "./store";
import ContextMenu from "./components/ContextMenu";
import { CANVAS_HEADER_HEIGHT } from "./constants/canvas-layout";
import { useEffect, useRef, useState } from "react";
import ImageFromUrl from "./components/ImageFromUrl";

import { useCanvasElements } from "./store/CanvasElements";
import RenderShape from "./components/RenderShape";
import ElementMenu from "./components/ElementMenu";

type CanvasSize = {
  width: number;
  height: number;
};

export default function App() {
  const { height, backgroundColor, width, zoom } = useCanvasProperties();

  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: window.innerWidth,
    height: window.innerHeight - CANVAS_HEADER_HEIGHT,
  });

  const { images, shapes, removeElement, currentElement, setCurrentElement } =
    useCanvasElements();

  const transformerRef = useRef<Konva.Transformer>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const stageRef = useRef<Konva.Stage>(null);

  console.log('ello');

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

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (!currentElement) return;
        removeElement(currentElement.id);
      }

      if (e.key === "Escape") {
        setCurrentElement(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentElement, removeElement, setCurrentElement]);

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
              />
            ))}

            <Transformer ref={transformerRef}></Transformer>
          </Layer>
        </Stage>
        <SidebarMenu />
        <ContextMenu />
        <ElementMenu />

        <ZoomOptions />
      </div>
    </div>
  );
}
