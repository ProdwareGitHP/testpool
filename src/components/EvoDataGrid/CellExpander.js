import React from "react";

function CellExpander({ tabIndex, expanded, onCellExpand }) {
  function handleKeyDown(e) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onCellExpand();
    }
  }

  return (
    <div>
      <span
        onClick={onCellExpand}
        onKeyDown={handleKeyDown}
        style={{ cursor: "pointer" }}
      >
        <span tabIndex={tabIndex}>{expanded ? "\u25BC" : "\u25B6"}</span>
      </span>
    </div>
  );
}

export default CellExpander;
