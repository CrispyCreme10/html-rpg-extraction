import { CSSProperties } from "react";
import { GRID_CELL_SIZE } from "../../constants/grid-cell";
import { DragValidityColor } from "./GridContainer";

export type GridCellProps = {
  x: number;
  y: number;
  dragOverCallback: (x: number, y: number) => void;
  dragValidityColor: DragValidityColor;
};

const GridCell = ({
  x,
  y,
  dragOverCallback,
  dragValidityColor,
}: GridCellProps) => {
  const dragColorMap = {
    valid: "green",
    invalid: "red",
    "": "",
  };

  const gridCellStyles: CSSProperties = {
    width: `${GRID_CELL_SIZE}px`,
    height: `${GRID_CELL_SIZE}px`,
    backgroundColor: dragColorMap[dragValidityColor],
    opacity:
      dragValidityColor === "valid" || dragValidityColor === "invalid"
        ? "0.5"
        : "1",
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.preventDefault();
    dragOverCallback(x, y);
  };

  return (
    <div
      style={gridCellStyles}
      className="relative border-x border-y border-white/15 bg-zinc-900 hover:bg-zinc-800"
      onMouseEnter={handleMouseEnter}
    ></div>
  );
};

export default GridCell;
