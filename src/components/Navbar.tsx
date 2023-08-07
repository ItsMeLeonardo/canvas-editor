import { Download, Menu, NavArrowLeft } from "iconoir-react";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between p-2 bg-secondary h-navbar relative z-10">
      <div className="flex items-center gap-1 h-full text-secondary">
        <button className="h-full aspect-square text-sm flex items-center justify-center hover:bg-primary rounded-lg hover:text-white ">
          <NavArrowLeft />
        </button>

        <button className="h-full aspect-square text-sm flex items-center justify-center hover:bg-primary rounded-lg hover:text-white ">
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
    </nav>
  );
}
