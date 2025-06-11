import { createPortal } from "react-dom";

export const FloatingMenu = ({ x, y, children }) => {
  return createPortal(
    <div
      className="fixed w-32 bg-white dark:bg-neutral-800 shadow-lg rounded-md z-50 cursor-pointer"
      style={{ top: y, left: x }}
    >
      {children}
    </div>,
    document.body
  );
};
