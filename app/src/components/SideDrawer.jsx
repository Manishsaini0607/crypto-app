import React from "react";
import Sidenav from "./Sidenav";

const SideDrawer = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // nothing to mount

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
        {/* Close button */}
        <button
          aria-label="Close drawer"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        {/* Drawer content */}
        <div className="p-4 h-full overflow-y-auto">
          <Sidenav />
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
