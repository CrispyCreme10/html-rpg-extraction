import { CSSProperties } from "react";
import { GRID_CELL_SIZE } from "../../constants/grid-cell";

const GridCell = () => {
  const gridCellStyles: CSSProperties = {
    width: `${GRID_CELL_SIZE}px`,
    height: `${GRID_CELL_SIZE}px`,
  };

  return (
    <div
      style={gridCellStyles}
      className="relative border-x border-y border-white/15 bg-zinc-900 hover:bg-zinc-800"
    ></div>
  );
};

export default GridCell;
