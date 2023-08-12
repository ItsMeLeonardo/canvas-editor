import { atom } from "jotai";
import { useAtomValue, useSetAtom } from "jotai/react";
import type {
  CanvasElement,
  ImageElement,
  ShapeElement,
  ShapeStar,
  ShapeCircle,
  ShapeRect,
  TextElement,
  ShapeEllipse,
  ShapeArc,
  ShapeWedge,
  CreateCanvasElement,
  CreateImageElement,
  CreateTextElement,
  CreateShapeElement,
  UpdateCanvasElement,
} from "./canvas-elements";
import { generateId } from "../../utils";

export type CanvasElementsState = {
  elements: CanvasElement[];
  currentElementId: string | null;
};

const canvasElementsInitialState: CanvasElementsState = {
  currentElementId: null,
  elements: [],
};

export const canvasElementsAtom = atom<CanvasElementsState>(
  canvasElementsInitialState
);

//NOTE: This is a helper function to create a canvas element, this is not necessary but typescript will complain if we don't have this
function createCanvasElement(element: CreateCanvasElement): CanvasElement {
  const id = generateId();

  switch (element.type) {
    case "image":
      return {
        id,
        ...(element as CreateImageElement),
      };

    case "text":
      return {
        id,
        ...(element as CreateTextElement),
      };

    case "shape": {
      const shapeElement = element as ShapeElement;
      switch (shapeElement.shapeType) {
        case "star":
          return {
            id,
            ...(element as CreateShapeElement & ShapeStar),
          };

        case "rect":
          return {
            id,
            ...(element as CreateShapeElement & ShapeRect),
          };

        case "circle":
          return {
            id,
            ...(element as CreateShapeElement & ShapeCircle),
          };

        case "ellipse":
          return {
            id,
            ...(element as CreateShapeElement & ShapeEllipse),
          };

        case "arc":
          return {
            id,
            ...(element as CreateShapeElement & ShapeArc),
          };

        case "wedge":
          return {
            id,
            ...(element as CreateShapeElement & ShapeWedge),
          };

        default:
          throw new Error(`Unsupported shape type`);
      }
    }
    default:
      throw new Error("Invalid element type");
  }
}

export const addElementAtom = atom(
  null,
  (_, set, element: CreateCanvasElement) => {
    const newCanvasElement = createCanvasElement(element);
    set(canvasElementsAtom, (prev) => ({
      ...prev,
      currentElementId: newCanvasElement.id,
      elements: [...prev.elements, newCanvasElement],
    }));
  }
);

export const removeElementAtom = atom(null, (_, set, elementId: string) => {
  set(canvasElementsAtom, (prev) => ({
    ...prev,
    currentElementId:
      elementId === prev.currentElementId ? null : prev.currentElementId,
    elements: prev.elements.filter((e) => e.id !== elementId),
  }));
});

export const updateElementAtom = atom(
  null,
  (_, set, element: UpdateCanvasElement) => {
    set(canvasElementsAtom, (prev) => ({
      ...prev,
      elements: prev.elements.map((e) => {
        if (e.id === element.id) {
          return {
            ...e,
            ...(element as CanvasElement),
          };
        }
        return e;
      }),
    }));
  }
);

export const setCurrentElementAtom = atom(
  null,
  (_, set, elementId: string | null) => {
    set(canvasElementsAtom, (prev) => ({
      ...prev,
      currentElementId: elementId,
    }));
  }
);

export const currentElementAtom = atom((get) => {
  const elements = get(canvasElementsAtom);

  return elements.elements.find((e) => e.id === elements.currentElementId);
});

export const currentElementIdAtom = atom((get) => {
  const elements = get(canvasElementsAtom);

  return elements.currentElementId;
});

export const canvasImageElementsAtom = atom<ImageElement[]>((get) => {
  const canvasState = get(canvasElementsAtom);

  return canvasState.elements.filter(
    (e) => e.type === "image"
  ) as ImageElement[];
});

export const canvasTextElementsAtom = atom<TextElement[]>((get) => {
  const canvasState = get(canvasElementsAtom);

  return canvasState.elements.filter((e) => e.type === "text") as TextElement[];
});

export const canvasShapeElementsAtom = atom<ShapeElement[]>((get) => {
  const canvasState = get(canvasElementsAtom);

  return canvasState.elements.filter(
    (e) => e.type === "shape"
  ) as ShapeElement[];
});

export function useCanvasElements() {
  const addElement = useSetAtom(addElementAtom);
  const removeElement = useSetAtom(removeElementAtom);
  const updateElement = useSetAtom(updateElementAtom);
  const setCurrentElement = useSetAtom(setCurrentElementAtom);
  const currentElement = useAtomValue(currentElementAtom);

  const images = useAtomValue(canvasImageElementsAtom);
  const texts = useAtomValue(canvasTextElementsAtom);
  const shapes = useAtomValue(canvasShapeElementsAtom);

  return {
    images,
    texts,
    shapes,
    addElement,
    removeElement,
    updateElement,
    setCurrentElement,
    currentElement,
  };
}
