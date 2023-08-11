import {
  Copy,
  Download,
  NavArrowDown,
  NavArrowUp,
  Trash,
  Upload,
  Lock,
  PasteClipboard,
  AddCircle,
  ViewGrid,
  GridRemove,
} from "iconoir-react";
import { useEffect, useRef } from "react";

export default function ContextMenu() {
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

    const hideContextMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (contextMenu.contains(target)) return;

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
  );
}
