export type CanvasBaseElement = {
  id: string;
  x: number;
  y: number;
  rotation?: number;
  visible?: boolean;
  name?: string;
  opacity?: number;
  draggable?: boolean;
};

export type ImageElement = CanvasBaseElement & {
  type: "image";
  src: string;
  width?: number;
  height?: number;
};

export type CreateImageElement = Omit<ImageElement, "id">;

export type TextElement = CanvasBaseElement & {
  type: "text";
  content: string;
  fontSize: number;
  fontFamily: string;
  color: string;
};

export type CreateTextElement = Omit<TextElement, "id">;

export type ShapeRect = {
  shapeType: "rect";
};

export type ShapeCircle = {
  shapeType: "circle";
  radius?: number;
};

export type ShapeEllipse = {
  shapeType: "ellipse";
  radiusX: number;
  radiusY: number;
};

export type ShapeArc = {
  shapeType: "arc";
  angle: number;
  innerRadius: number;
  outerRadius: number;
  clockwise?: boolean;
};

export type ShapeWedge = {
  shapeType: "wedge";
  angle: number;
  radius: number;
  clockwise?: boolean;
};

export type ShapeStar = {
  shapeType: "star";
  numPoints: number;
  innerRadius: number;
  outerRadius: number;
};

export type ShapeElement = CanvasBaseElement & {
  type: "shape";
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  fill: string;
} & (
    | ShapeRect
    | ShapeCircle
    | ShapeEllipse
    | ShapeArc
    | ShapeWedge
    | ShapeStar
  );

export type CreateShapeElement = Omit<ShapeElement, "id">;

export type CanvasElement = ImageElement | TextElement | ShapeElement;

export type CreateCanvasElement = Omit<CanvasElement, "id">;
