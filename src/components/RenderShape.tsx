import { Arc, Star, Wedge, Ellipse, Circle, Rect } from "react-konva";
import type { ShapeElement } from "../store/CanvasElements/canvas-elements";
import { KonvaNodeEvents } from "react-konva";

type Props = {
  shape: ShapeElement;
} & KonvaNodeEvents;

export default function RenderShape(props: Props) {
  const { shape, ...events } = props;

  if (shape.shapeType === "rect") {
    return <Rect {...shape} {...events} />;
  }

  if (shape.shapeType === "circle") {
    return <Circle {...shape} {...events} />;
  }

  if (shape.shapeType === "ellipse") {
    return <Ellipse {...shape} {...events} />;
  }

  if (shape.shapeType === "wedge") {
    return <Wedge {...shape} {...events} />;
  }

  if (shape.shapeType === "star") {
    return <Star {...shape} {...events} />;
  }

  if (shape.shapeType === "arc") {
    return <Arc {...shape} {...events} />;
  }

  return null;
}
