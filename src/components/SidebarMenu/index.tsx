import Tippy from "@tippyjs/react";
import FloatMenu from "../FloatMenu";
import {
  Facebook,
  FrameTool,
  GridAdd,
  Instagram,
  Keyframes,
  MediaImage,
  Text,
  Upload,
  YouTube,
} from "iconoir-react";
import { ReactNode } from "react";
import { useCanvasProperties } from "../../store";
import clsx from "clsx";

import { useCanvasElements } from "../../store/CanvasElements";
import { CreateImageElement } from "../../store/CanvasElements/canvas-elements";
import { getCanvasCenter } from "../../utils/canvas-editor";
import ShapeSubMenu from "./ShapeSubMenu";

type Size = {
  width: number;
  height: number;
};

type CanvasSize = {
  label: string;
  size: Size;
  icon: ReactNode;
};

const DEFAULT_SIZES: CanvasSize[] = [
  {
    label: "Instagram Post",
    size: { width: 1080, height: 1080 },
    icon: <Instagram />,
  },
  {
    label: "Instagram Story",
    size: { width: 1080, height: 1920 },
    icon: <Instagram />,
  },
  {
    label: "Instagram Ad",
    size: { width: 1080, height: 1350 },
    icon: <Instagram />,
  },
  {
    label: "Facebook Post",
    size: { width: 940, height: 788 },
    icon: <Facebook />,
  },
  {
    label: "Facebook Cover",
    size: { width: 851, height: 315 },
    icon: <Facebook />,
  },
  {
    label: "Facebook Ad",
    size: { width: 1200, height: 628 },
    icon: <Facebook />,
  },
  {
    label: "YouTube Thumbnail",
    size: { width: 1280, height: 720 },
    icon: <YouTube />,
  },
  {
    label: "YouTube Channel Art",
    size: { width: 2560, height: 1440 },
    icon: <YouTube />,
  },
];

const IMAGES = [
  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFwYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=60",
  "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amFwYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1500&q=60",
  "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGphcGFufGVufDB8fDB8fHww&auto=format&fit=crop&w=1500&q=60",
  "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGphcGFufGVufDB8fDB8fHww&auto=format&fit=crop&w=1500&q=60",
  "https://plus.unsplash.com/premium_photo-1674718013659-6930c469e641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGphcGFufGVufDB8fDB8fHww&auto=format&fit=crop&w=1500&q=60",
  "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGphcGFufGVufDB8fDB8fHww&auto=format&fit=crop&w=1500&q=60",
  "https://plus.unsplash.com/premium_photo-1674824835422-1447f5901086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGphcGFufGVufDB8fDB8fHww&auto=format&fit=crop&w=1500&q=60",
  "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  "https://i.pinimg.com/236x/13/fe/6a/13fe6a479956ab94d6823687c67d1109.jpg",
  "https://i.pinimg.com/236x/ca/7e/29/ca7e291a3d84c7753a439629e9ba807e.jpg",
];

export default function SidebarMenu() {
  const { addElement } = useCanvasElements();

  const halfLength = Math.ceil(IMAGES.length / 2);

  const listImage = [
    IMAGES.slice(0, halfLength),
    IMAGES.slice(halfLength, IMAGES.length),
  ];

  const { resizeCanvas, width, height } = useCanvasProperties();

  return (
    <FloatMenu className="top-4 left-4 p-2" draggable>
      <Tippy
        placement="right"
        offset={[0, 15]}
        delay={[10, 10]}
        content={
          <span className="p-2 px-3 rounded-md font-semibold text-xs bg-secondary text-secondary">
            Layout
          </span>
        }
      >
        <button className="p-2 hover:bg-primary text-primary rounded-lg">
          <GridAdd />
        </button>
      </Tippy>

      <button className="p-2 hover:bg-primary text-primary rounded-lg">
        <Text />
      </button>
      <button className="p-2 hover:bg-primary text-primary rounded-lg">
        <Upload />
      </button>
      <Tippy
        placement="right"
        offset={[0, 15]}
        delay={[10, 10]}
        interactive
        content={
          <div className="p-2 px-3 bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl font-semibold text-xs  text-secondary w-72 max-h-96 overflow-auto">
            <header className="whitespace-nowrap mb-4">
              <h4 className="font-semibold text-sm">Choose an Image</h4>
            </header>

            <div className="grid grid-cols-2 gap-2">
              {listImage.map((images, index) => (
                <div key={index} className="flex flex-col gap-2">
                  {images.map((image) => (
                    <button
                      className="group overflow-hidden rounded-md"
                      key={image}
                      onClick={() => {
                        const { x, y } = getCanvasCenter();

                        const imageElement: CreateImageElement = {
                          type: "image",
                          src: image,
                          x,
                          y,
                          draggable: true,
                        };
                        addElement(imageElement);
                      }}
                      draggable
                    >
                      <img
                        src={image}
                        alt="image"
                        className="object-cover w-full h-auto rounded-md transform group-hover:scale-110 transition-transform hover:rotate-2 duration-300"
                      />
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        }
      >
        <button className="p-2 hover:bg-primary text-primary rounded-lg">
          <MediaImage />
        </button>
      </Tippy>
      <button className="p-2 hover:bg-primary text-primary rounded-lg">
        <Keyframes />
      </button>
      <ShapeSubMenu />
      <Tippy
        placement="right"
        offset={[0, 15]}
        delay={[10, 10]}
        interactive
        content={
          <div className="p-2 px-3 font-semibold text-xs bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl text-secondary">
            <header>
              <h4 className="font-semibold text-sm">Choose a size</h4>
            </header>
            {DEFAULT_SIZES.map((canvas) => {
              const isActive =
                canvas.size.width === width && canvas.size.height === height;

              const buttonClasses = clsx(
                "flex items-center justify-between relative w-full text-xs text-white hover:bg-primary p-2 rounded-lg whitespace-nowrap",
                {
                  "bg-primary/50": isActive,
                }
              );

              return (
                <button
                  key={canvas.label}
                  onClick={() => resizeCanvas(canvas.size)}
                  className={buttonClasses}
                >
                  <div className="flex gap-2 items-center mr-8 font-normal">
                    <span>{canvas.icon}</span>
                    <span className="text-sm">{canvas.label}</span>
                  </div>

                  <span className="text-gray-300">{`${canvas.size.width} x ${canvas.size.height}px`}</span>
                </button>
              );
            })}
          </div>
        }
      >
        <button className="p-2 hover:bg-primary text-primary rounded-lg">
          <FrameTool />
        </button>
      </Tippy>
    </FloatMenu>
  );
}
