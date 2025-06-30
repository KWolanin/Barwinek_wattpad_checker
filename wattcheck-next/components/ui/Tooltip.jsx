import { useState } from "react";

export default function Tooltip({ children, text }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {    show && (
        <div className="absolute ml-2 px-2 py-1
         bg-gray-700 text-white text-xs rounded shadow-lg z-10 whitespace-nowrap">
          {text}
        </div>
        
      )} 
    </div>
  );
}
