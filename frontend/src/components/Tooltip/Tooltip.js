import React from "react";

export default function Tooltip({ message, children }) {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute z-50 top-2 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-75">
        {message}
      </span>
    </div>
  );
}
