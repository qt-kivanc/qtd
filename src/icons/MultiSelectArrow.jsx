import React from "react";

const MultiSelectArrow = ({ className, height, width, fill }) => {
  return (
    <svg
      className={className}
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 10"
    >
      <polygon points="20 0.5 10 10.5 0 0.5"></polygon>
    </svg>
  );
};

export default MultiSelectArrow;

