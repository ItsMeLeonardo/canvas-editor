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
  Italic,
  Minus,
  NavArrowDown,
  NavArrowUp,
  Plus,
  Strikethrough,
  Trash,
  Underline,
  Upload,
  Lock,
  PasteClipboard,
  AddCircle,
  ViewGrid,
  GridRemove,
} from "iconoir-react";
import { useEffect, useRef } from "react";
import ColorPicker from "./components/ColorPicker";
import Navbar from "./components/Navbar";
import FloatMenu from "./components/FloatMenu";
import ZoomOptions from "./components/ZoomOptions";
import SidebarMenu from "./components/SidebarMenu";
import { useCanvasProperties } from "./store";

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

export default function App() {
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const { height, backgroundColor, width, updateBackgroundColor } =
    useCanvasProperties();

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
      <Navbar />
      <div className="relative h-content w-full grid place-content-center">
        <SidebarMenu />
        <div
          className="aspect-square p-2"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
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
