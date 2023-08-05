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
  Copy,
  Download,
  Flare,
  FrameTool,
  GridAdd,
  Italic,
  Keyframes,
  MediaImage,
  Menu,
  Minus,
  NavArrowDown,
  NavArrowLeft,
  NavArrowUp,
  Plus,
  Strikethrough,
  Text,
  Trash,
  Underline,
  Upload,
  Lock,
  PasteClipboard,
  AddCircle,
  ViewGrid,
  GridRemove,
  Instagram,
  Facebook,
  YouTube,
  Circle,
  Square,
} from "iconoir-react";
import { ReactNode, useEffect, useRef } from "react";

type Size = {
  label: string;
  size: `${number} x ${number} px`;
  icon: ReactNode;
};

type Shape = {
  label: string;
  icon: ReactNode;
};

type Font = {
  label: string;
};

type Weight = {
  label: string;
};

const DEFAULT_SHAPES: Shape[] = [
  {
    label: "Rectangle",
    icon: <FrameTool />,
  },
  {
    label: "Circle",
    icon: <Circle />,
  },
  {
    label: "Square",
    icon: <Square />,
  },
];

const DEFAULT_SIZES: Size[] = [
  {
    label: "Instagram Post",

    size: "1080 x 1080 px",
    icon: <Instagram />,
  },
  {
    label: "Instagram Story",

    size: "1080 x 1920 px",
    icon: <Instagram />,
  },
  {
    label: "Instagram Ad",

    size: "1080 x 1350 px",
    icon: <Instagram />,
  },
  {
    label: "Facebook Post",
    size: "940 x 788 px",
    icon: <Facebook />,
  },
  {
    label: "Facebook Cover",
    size: "851 x 315 px",
    icon: <Facebook />,
  },
  {
    label: "Facebook Ad",
    size: "1200 x 628 px",
    icon: <Facebook />,
  },
  {
    label: "YouTube Thumbnail",
    size: "1280 x 720 px",
    icon: <YouTube />,
  },
  {
    label: "YouTube Channel Art",
    size: "2560 x 1440 px",
    icon: <YouTube />,
  },
];

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

export default function App() {
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contextMenu = contextMenuRef.current;
    if (!contextMenu) return;

    const showContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      const left = e.clientX;
      const top = e.clientY;

      contextMenu.style.left = `${left}px`;
      contextMenu.style.top = `${top}px`;
      contextMenu.classList.remove("hidden");
    };

    const hideContextMenu = () => {
      contextMenu.classList.add("hidden");
    };

    window.addEventListener("contextmenu", showContextMenu);

    window.addEventListener("click", hideContextMenu);

    return () => {
      window.removeEventListener("contextmenu", showContextMenu);
      window.removeEventListener("click", hideContextMenu);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-background">
      <header className="w-full flex items-center justify-between p-2 bg-secondary h-navbar">
        <div className="flex items-center gap-1  text-secondary">
          <button className="p-2 hover:bg-primary rounded-lg hover:text-white">
            <NavArrowLeft />
          </button>

          <button className="p-2 hover:bg-primary rounded-lg hover:text-white ">
            <Menu />
          </button>

          <h4 className="text-lg font-medium">Playground untitled</h4>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-4 p-2 rounded-lg text-xs bg-primary text-white flex items-center gap-2">
            <span className="text-sm">
              <Download />
            </span>
            <span>Download</span>
          </button>
        </div>
      </header>
      <div className="relative h-content w-full ">
        <aside className="absolute flex flex-col top-4 left-4 bg-secondary p-2 rounded-xl">
          <Tippy
            placement="left"
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
          <button className="p-2 hover:bg-primary text-primary rounded-lg">
            <MediaImage />
          </button>
          <button className="p-2 hover:bg-primary text-primary rounded-lg">
            <Keyframes />
          </button>
          <Tippy
            placement="left"
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
          <Tippy
            placement="left"
            offset={[0, 15]}
            delay={[10, 10]}
            interactive
            content={
              <div className="p-2 px-3 font-semibold text-xs bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl text-secondary">
                <header>
                  <h4 className="font-semibold text-sm">Choose a size</h4>
                </header>
                {DEFAULT_SIZES.map((size) => (
                  <button
                    key={size.label}
                    className="flex items-center justify-between w-full text-xs text-white hover:bg-primary p-2 rounded-lg whitespace-nowrap"
                  >
                    <div className="flex gap-2 items-center mr-8 font-normal">
                      <span>{size.icon}</span>
                      <span className="text-sm">{size.label}</span>
                    </div>

                    <span className="text-gray-300">{size.size}</span>
                  </button>
                ))}
              </div>
            }
          >
            <button className="p-2 hover:bg-primary text-primary rounded-lg">
              <FrameTool />
            </button>
          </Tippy>
        </aside>

        <img
          src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="h-[70%] aspect-square absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
        />

        <aside
          className="w-contextMenu fixed bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl hidden z-10"
          ref={contextMenuRef}
        >
          <div className="flex flex-col border-b-gray-50/50 border-b p-2">
            <button className="w-full bg-transparent text-xs hover:bg-primary text-white p-2 flex gap-2 rounded-lg">
              <span>
                <NavArrowUp />
              </span>
              <span>Bring forward</span>
            </button>
            <button className="w-full bg-transparent text-xs hover:bg-primary text-white p-2 flex gap-2 rounded-lg">
              <span>
                <Upload />
              </span>
              <span>Bring to front</span>
            </button>
            <button className="w-full bg-transparent text-xs hover:bg-primary text-white p-2 flex gap-2 rounded-lg">
              <span>
                <NavArrowDown />
              </span>
              <span>Bring backward</span>
            </button>
            <button className="w-full bg-transparent text-xs hover:bg-primary text-white p-2 flex gap-2 rounded-lg">
              <span>
                <Download />
              </span>
              <span>Bring to back</span>
            </button>
          </div>
          <div className="flex flex-col border-b-gray-50/50 border-b p-2">
            <button className="w-full bg-transparent text-xs hover:bg-primary text-white p-2 flex gap-2 rounded-lg">
              <span>
                <Trash />
              </span>
              <span>Delete</span>
            </button>
            <button className="w-full bg-transparent text-xs hover:bg-primary text-white p-2 flex gap-2 rounded-lg">
              <span>
                <Copy />
              </span>
              <span>Duplicate</span>
            </button>
            <button className="w-full bg-transparent text-xs hover:bg-primary text-white p-2 flex gap-2 rounded-lg">
              <span>
                <Lock />
              </span>
              <span>Lock</span>
            </button>
            <button className="w-full bg-transparent text-xs hover:bg-primary text-white p-2 flex gap-2 rounded-lg">
              <span>
                <AddCircle />
              </span>
              <span>Copy</span>
            </button>
            <button className="w-full bg-transparent text-xs hover:bg-primary text-white p-2 flex gap-2 rounded-lg">
              <span>
                <PasteClipboard />
              </span>
              <span>Paste</span>
            </button>
          </div>
          <div className="flex flex-col p-2">
            <button className="w-full bg-transparent text-xs hover:bg-primary text-white p-2 flex gap-2 rounded-lg">
              <span>
                <ViewGrid />
              </span>
              <span>Group</span>
            </button>
            <button className="w-full bg-transparent text-xs hover:bg-primary text-white p-2 flex gap-2 rounded-lg">
              <span>
                <GridRemove />
              </span>
              <span>Ungroup</span>
            </button>
          </div>
        </aside>

        <aside className="absolute left-1/2 -translate-x-1/2 flex gap-2 bottom-4">
          <button className="p-2 bg-secondary hover:bg-primary text-primary rounded-lg">
            <Minus />
          </button>
          <span className="p-2 px-4 bg-secondary text-secondary rounded-lg">
            100%
          </span>
          <button className="p-2 bg-secondary hover:bg-primary text-primary rounded-lg">
            <Plus />
          </button>
        </aside>

        <aside className="absolute right-4 flex flex-col top-4 bg-secondary  rounded-xl w-designTools">
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
                    <div className="p-2  px-3 font-semibold text-xs bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl text-secondary w-44">
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
                <label className="bg-background/50 text-white text-xs block aspect-square w-10 bg-orange-500 rounded-lg"></label>
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
        </aside>
      </div>
    </div>
  );
}
