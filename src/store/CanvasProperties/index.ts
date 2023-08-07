import { atom, useAtomValue, useSetAtom } from "jotai";

type CanvasPropertiesState = {
  width: number;
  height: number;
  backgroundColor: string;
  zoom: number;
};

type CanvasSizeProperty = {
  width: number;
  height: number;
};

const initialState: CanvasPropertiesState = {
  width: 500,
  height: 500,
  backgroundColor: "#ffffff",
  zoom: 100,
};

const canvasPropertiesAtom = atom<CanvasPropertiesState>(initialState);

const resizeCanvasAtom = atom(null, (_, set, update: CanvasSizeProperty) => {
  const { width, height } = update;
  set(canvasPropertiesAtom, (prev) => ({
    ...prev,
    width,
    height,
  }));
});

const updateBackgroundColorAtom = atom(
  null,
  (_, set, backgroundColor: string) => {
    set(canvasPropertiesAtom, (prev) => ({
      ...prev,
      backgroundColor,
    }));
  }
);

const changeZoomCanvasAtom = atom(null, (_, set, zoom: number) => {
  set(canvasPropertiesAtom, (prev) => ({
    ...prev,
    zoom,
  }));
});

export function useCanvasProperties() {
  const canvasProperties = useAtomValue(canvasPropertiesAtom);
  const resizeCanvas = useSetAtom(resizeCanvasAtom);
  const updateBackgroundColor = useSetAtom(updateBackgroundColorAtom);

  const setZoomCanvas = useSetAtom(changeZoomCanvasAtom);

  return {
    ...canvasProperties,
    resizeCanvas,
    updateBackgroundColor,
    setZoomCanvas,
  };
}
