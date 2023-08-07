import Tippy from "@tippyjs/react";
import { Minus, Plus } from "iconoir-react";
import { useCanvasProperties } from "../../store";
import clsx from "clsx";

const ZOOM_OPTIONS = [25, 50, 75, 100, 125, 150, 200, 300, 400];

export default function ZoomOptions() {
  const { setZoomCanvas, zoom } = useCanvasProperties();

  const handleIncreaseZoom = () => {
    const index = ZOOM_OPTIONS.indexOf(zoom);
    if (index === ZOOM_OPTIONS.length - 1) return;
    setZoomCanvas(ZOOM_OPTIONS[index + 1]);
  };

  const handleDecreaseZoom = () => {
    const index = ZOOM_OPTIONS.indexOf(zoom);
    if (index === 0) return;
    setZoomCanvas(ZOOM_OPTIONS[index - 1]);
  };

  const hasReachedMaxZoom = zoom === ZOOM_OPTIONS[ZOOM_OPTIONS.length - 1];
  const hasReachedMinZoom = zoom === ZOOM_OPTIONS[0];

  return (
    <aside className="absolute left-1/2 -translate-x-1/2 flex gap-2 bottom-4">
      <button
        className="p-2 bg-secondary hover:bg-primary text-primary rounded-lg disabled:bg-secondary/70"
        onClick={handleDecreaseZoom}
        disabled={hasReachedMinZoom}
      >
        <Minus />
      </button>

      <Tippy
        placement="top"
        interactive
        offset={[0, 5]}
        content={
          <div className="p-2 px-3 font-semibold text-xs bg-secondary-color/25 backdrop-blur-2xl border border-gray-100/10 rounded-xl text-secondary max-h-52 overflow-auto">
            {ZOOM_OPTIONS.map((zoomOption) => {
              const active = zoomOption === zoom;

              const classes = clsx(
                "flex items-center justify-between w-full text-xs text-white hover:bg-primary p-2 rounded-lg whitespace-nowrap",
                {
                  "bg-primary/50": active,
                }
              );
              return (
                <button
                  key={zoomOption}
                  className={classes}
                  onClick={() => setZoomCanvas(zoomOption)}
                >
                  <div className="flex gap-2 items-center font-normal">
                    <span className="text-sm">{zoomOption} %</span>
                  </div>
                </button>
              );
            })}
          </div>
        }
      >
        <span className="p-2 px-4 bg-secondary text-secondary rounded-lg">
          {zoom}%
        </span>
      </Tippy>
      <button
        className="p-2 bg-secondary hover:bg-primary text-primary rounded-lg disabled:bg-secondary/70"
        onClick={handleIncreaseZoom}
        disabled={hasReachedMaxZoom}
      >
        <Plus />
      </button>
    </aside>
  );
}
