import {
  Download,
  Flare,
  FrameTool,
  GridAdd,
  Keyframes,
  MediaImage,
  Menu,
  NavArrowLeft,
  Text,
  Upload,
} from "iconoir-react";

export default function App() {
  return (
    <div className="w-screen h-screen bg-background">
      <header className="w-full flex items-center justify-between p-2 bg-secondary h-navbar">
        <div className="flex items-center gap-1  text-secondary">
          <button className="p-2">
            <NavArrowLeft />
          </button>

          <button className="p-2 ">
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
      <div className="relative h-content w-full">
        <div className="absolute flex flex-col top-4 left-4 bg-secondary p-2 rounded-xl">
          <button className="p-2 hover:bg-primary text-primary rounded-lg">
            <GridAdd />
          </button>
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
          <button className="p-2 hover:bg-primary text-primary rounded-lg">
            <Flare />
          </button>
          <button className="p-2 hover:bg-primary text-primary rounded-lg">
            <FrameTool />
          </button>
        </div>
      </div>
    </div>
  );
}
