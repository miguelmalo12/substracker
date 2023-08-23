import { useState } from "react";

import DoubleArrow from "../assets/icons/double_arrow.svg";

function DropdownFilter({ options, onChange }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleClick = () => {
    const nextIdx = (currentIdx + 1) % options.length; // Cycle through the options
    setCurrentIdx(nextIdx);

    if (onChange && typeof onChange === "function") {
      onChange(options[nextIdx]);
    }
  };

  return (
    <>
      <div
        className="relative flex items-center w-32 h-10 border rounded cursor-pointer"
        onClick={handleClick}
      >
        <span className="w-full px-2 font-semibold double-arrow-dropdown">
          {options[currentIdx]}
        </span>
        <img
          className="absolute top-3 right-2.5 pointer-events-none"
          src={DoubleArrow}
          alt=""
        />
      </div>
    </>
  );
}

export default DropdownFilter;
