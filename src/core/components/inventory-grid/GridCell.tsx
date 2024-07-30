import { CSSProperties, useState } from "react";
import { GRID_CELL_SIZE } from "../../constants/grid-cell";
import { DragOverType, DragValidityColor } from "./GridContainer";
import { DragDropHandler } from "../../singletons/drag-drop";

export type GridCellProps = {
  x: number;
  y: number;
  dragOverCallback: DragOverType;
  dragValidityColor: DragValidityColor;
};

const GridCell = ({
  x,
  y,
  dragOverCallback,
  dragValidityColor,
}: GridCellProps) => {
  const [isPastHalfHorizontal, setIsPastHalfHorizontal] = useState(false);
  const [isPastHalfVertical, setIsPastHalfVertical] = useState(false);

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
    triggerDragOverCallback(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    triggerDragOverCallback(e);
  };

  const triggerDragOverCallback = (e: React.MouseEvent) => {
    if (!DragDropHandler.getInstance().isDragging) return;

    const cellX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const cellY = e.clientY - e.currentTarget.getBoundingClientRect().top;

    const localIsPastHalfVertical = cellX > GRID_CELL_SIZE / 2;
    const localIsPastHalfHorizontal = cellY > GRID_CELL_SIZE / 2;

    let triggerDragOver = false;
    let triggerIsPastHalfVertical = isPastHalfVertical;
    let triggerIsPastHalfHorizontal = isPastHalfHorizontal;

    if (isPastHalfVertical !== localIsPastHalfVertical) {
      triggerDragOver = true;
      setIsPastHalfVertical(localIsPastHalfVertical);
      triggerIsPastHalfVertical = localIsPastHalfVertical;
    }

    if (isPastHalfHorizontal !== localIsPastHalfHorizontal) {
      triggerDragOver = true;
      setIsPastHalfHorizontal(localIsPastHalfHorizontal);
      triggerIsPastHalfHorizontal = localIsPastHalfHorizontal;
    }

    if (triggerDragOver) {
      dragOverCallback(
        x,
        y,
        triggerIsPastHalfVertical,
        triggerIsPastHalfHorizontal
      );
    }
  };

  return (
    <div
      style={gridCellStyles}
      className="relative border-x border-y border-white/15 bg-zinc-900"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
    ></div>
  );
};

export default GridCell;
