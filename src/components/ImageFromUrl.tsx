import Konva from "konva";
import { ForwardedRef, forwardRef } from "react";
import { Image, KonvaNodeEvents } from "react-konva";
import useImage from "use-image";

type KonvaImageEvents = KonvaNodeEvents; /* {
  onClick?: KonvaNodeEvents["onClick"];
  onDblClick?: KonvaNodeEvents["onDblClick"];
  onMouseDown?: KonvaNodeEvents["onMouseDown"];
  onMouseUp?: KonvaNodeEvents["onMouseUp"];
  onMouseOver?: KonvaNodeEvents["onMouseOver"];
  onMouseOut?: KonvaNodeEvents["onMouseOut"];
  onMouseMove?: KonvaNodeEvents["onMouseMove"];
  onMouseLeave?: KonvaNodeEvents["onMouseLeave"];
  onMouseEnter?: KonvaNodeEvents["onMouseEnter"];
  onTouchStart?: KonvaNodeEvents["onTouchStart"];
  onTouchEnd?: KonvaNodeEvents["onTouchEnd"];
  onTouchMove?: KonvaNodeEvents["onTouchMove"];
  onTap?: KonvaNodeEvents["onTap"];
  onDragStart?: KonvaNodeEvents["onDragStart"];
  onDragMove?: KonvaNodeEvents["onDragMove"];
  onDragEnd?: KonvaNodeEvents["onDragEnd"];
}; */

type KonvaImageProps = {
  x?: Konva.ImageConfig["x"];
  y?: Konva.ImageConfig["y"];
  width?: Konva.ImageConfig["width"];
  height?: Konva.ImageConfig["height"];
  fill?: Konva.ImageConfig["fill"];
  fillPatternImage?: Konva.ImageConfig["fillPatternImage"];
  fillPatternX?: Konva.ImageConfig["fillPatternX"];
  fillPatternY?: Konva.ImageConfig["fillPatternY"];
  fillPatternOffset?: Konva.ImageConfig["fillPatternOffset"];
  fillPatternScale?: Konva.ImageConfig["fillPatternScale"];
  fillPatternRotation?: Konva.ImageConfig["fillPatternRotation"];
  fillPatternRepeat?: Konva.ImageConfig["fillPatternRepeat"];
  fillLinearGradientStartPoint?: Konva.ImageConfig["fillLinearGradientStartPoint"];
  fillLinearGradientEndPoint?: Konva.ImageConfig["fillLinearGradientEndPoint"];
  fillLinearGradientColorStops?: Konva.ImageConfig["fillLinearGradientColorStops"];
  fillRadialGradientStartPoint?: Konva.ImageConfig["fillRadialGradientStartPoint"];
  fillRadialGradientStartRadius?: Konva.ImageConfig["fillRadialGradientStartRadius"];
  fillRadialGradientEndPoint?: Konva.ImageConfig["fillRadialGradientEndPoint"];
  fillRadialGradientEndRadius?: Konva.ImageConfig["fillRadialGradientEndRadius"];
  fillRadialGradientColorStops?: Konva.ImageConfig["fillRadialGradientColorStops"];
  fillEnabled?: Konva.ImageConfig["fillEnabled"];
  fillPriority?: Konva.ImageConfig["fillPriority"];
  stroke?: Konva.ImageConfig["stroke"];
  strokeWidth?: Konva.ImageConfig["strokeWidth"];
  strokeScaleEnabled?: Konva.ImageConfig["strokeScaleEnabled"];
  strokeEnabled?: Konva.ImageConfig["strokeEnabled"];
  lineJoin?: Konva.ImageConfig["lineJoin"];
  lineCap?: Konva.ImageConfig["lineCap"];
  shadowColor?: Konva.ImageConfig["shadowColor"];
  shadowBlur?: Konva.ImageConfig["shadowBlur"];
  shadowOffset?: Konva.ImageConfig["shadowOffset"];
  shadowOpacity?: Konva.ImageConfig["shadowOpacity"];
  shadowEnabled?: Konva.ImageConfig["shadowEnabled"];
  shadowForStrokeEnabled?: Konva.ImageConfig["shadowForStrokeEnabled"];
  dash?: Konva.ImageConfig["dash"];
  dashEnabled?: Konva.ImageConfig["dashEnabled"];
  dashOffset?: Konva.ImageConfig["dashOffset"];
  scaleX?: Konva.ImageConfig["scaleX"];
  scaleY?: Konva.ImageConfig["scaleY"];
  opacity?: Konva.ImageConfig["opacity"];
  globalCompositeOperation?: Konva.ImageConfig["globalCompositeOperation"];
  imageSmoothingEnabled?: Konva.ImageConfig["imageSmoothingEnabled"];
  draggable?: Konva.ImageConfig["draggable"];
} & KonvaImageEvents;

type Props = {
  src: string;
} & KonvaImageProps;

function ImageFromUrlComponent(props: Props, ref: ForwardedRef<Konva.Image>) {
  const { src, x = 0, y = 0, ...imageProps } = props;
  const [image] = useImage(src);

  return <Image {...imageProps} x={x} y={y} ref={ref} image={image} />;
}

const ImageFromUrl = forwardRef<Konva.Image, Props>(ImageFromUrlComponent);

export default ImageFromUrl;
