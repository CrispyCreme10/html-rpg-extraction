import { CSSProperties } from "react";
import GridCell from "./GridCell";
import { Inventory } from "../../data/inventories/inventory";
import InventoryItem from "../inventory-item/InventoryItem";

export type GridContainerProps = {
  inventory: Inventory;
  x: number;
  y: number;
};

const GridContainer = ({ inventory, x, y }: GridContainerProps) => {
  const rows = inventory.rows;
  const cols = inventory.cols;
  const grid = inventory.grid;

  const gridContainerStyles: CSSProperties = {
    top: `${y}px`,
    left: `${x}px`,
  };

  const gridCellElementStyles: CSSProperties = {
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
  };

  const gridCellElements: JSX.Element[] = [];
  const itemImageElements: JSX.Element[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      gridCellElements.push(<GridCell key={`${y}-${x}`} />);

      const itemId = grid[y][x];
      const item = inventory.getItem(itemId);
      if (item) {
        itemImageElements.push(
          <InventoryItem key={itemId} item={item} x={x} y={y} />
        );
      }
    }
  }

  return (
    <div id="grid-container" style={gridContainerStyles} className="absolute">
      <div
        id="grid-cell-elements"
        style={gridCellElementStyles}
        className="grid"
      >
        {gridCellElements}
      </div>
      <div id="inventory-item-elements">{itemImageElements}</div>
    </div>
  );
};

export default GridContainer;
