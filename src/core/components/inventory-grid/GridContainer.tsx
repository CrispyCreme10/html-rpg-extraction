import { CSSProperties } from "react";
import GridCell from "./GridCell";

export type GridContainerProps = {
  rows: number;
  cols: number;
  x: number;
  y: number;
};

const GridContainer = ({ rows, cols, x, y }: GridContainerProps) => {
  const gridContainerStyles: CSSProperties = {
    top: `${y}px`,
    left: `${x}px`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
  };

  const buildGrid = () => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid.push(<GridCell key={`${i}-${j}`} />);
      }
    }
    return grid;
  };

  return (
    <div
      id="grid-container"
      className="absolute grid"
      style={gridContainerStyles}
    >
      {buildGrid()}
    </div>
  );
};

export default GridContainer;
