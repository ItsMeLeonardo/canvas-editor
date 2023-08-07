import { ReactNode, useEffect, useRef } from "react";

import interact from "interactjs";
import { clsx } from "clsx";

type FloatMenuProps = {
  children: ReactNode;
  className?: string;
  draggable?: boolean;
};

export default function FloatMenu(props: FloatMenuProps) {
  const { children, className, draggable } = props;

  const menuRef = useRef<HTMLDivElement>(null);
  const dragAreaRef = useRef<HTMLDivElement>(null);

  const contentClasses = clsx(
    className,
    "absolute flex flex-col bg-secondary rounded-xl z-10"
  );

  useEffect(() => {
    const menu = menuRef.current;
    const dragArea = dragAreaRef.current;

    if (!draggable || !menu || !dragArea) return;

    function dragMoveListener(
      event: (MouseEvent | TouchEvent) & { dx: number; dy: number }
    ) {
      const target = event.target;
      if (!target || !menu) return;
      if (!(target instanceof HTMLElement)) return;
      // keep the dragged position in the data-x/data-y attributes
      const dataX = target.getAttribute("data-x") ?? "0";
      const dataY = target.getAttribute("data-y") ?? "0";
      const x = parseFloat(dataX) + event.dx;
      const y = parseFloat(dataY) + event.dy;

      menu.style.transform = `translate(${x}px, ${y}px)`;

      // translate the element
      target.setAttribute("data-x", x.toString());
      target.setAttribute("data-y", y.toString());

      // update the posiion attributes
    }

    interact(dragArea).draggable({
      inertia: true,
      listeners: {
        move: dragMoveListener,
      },
    });
  }, [draggable]);

  return (
    <aside className={contentClasses} ref={menuRef}>
      {draggable && (
        <div
          ref={dragAreaRef}
          className="h-6 flex justify-center items-center text-secondary"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}
      {children}
    </aside>
  );
}
