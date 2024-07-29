import { CSSProperties, useState } from "react";
import GridCell from "./GridCell";
import { Inventory } from "../../data/inventories/inventory";
import InventoryItem from "../inventory-item/InventoryItem";
import { DragDropHandler } from "../../singletons/drag-drop";

export type GridContainerProps = {
  inventory: Inventory;
  x: number;
  y: number;
};

export type DragValidityColor = "valid" | "invalid" | "";

const GridContainer = ({ inventory, x, y }: GridContainerProps) => {
  const [dragOverCells, setDragOverCells] = useState<[number, number][]>([]);
  const [dragValidityColor, setDragValidityColor] =
    useState<DragValidityColor>("");

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

  const handleDragOver = (x: number, y: number) => {
    const itemWidth = DragDropHandler.getInstance().getDraggedItem()?.width;
    const itemHeight = DragDropHandler.getInstance().getDraggedItem()?.height;

    if (!itemWidth || !itemHeight) {
      return;
    }

    const canAddItem = inventory.canAddItemAtPos(itemWidth, itemHeight, x, y);
    setDragValidityColor(canAddItem ? "valid" : "invalid");

    const cells: [number, number][] = [];
    for (let i = 0; i < itemHeight; i++) {
      for (let j = 0; j < itemWidth; j++) {
        cells.push([x + j, y + i]);
      }
    }

    setDragOverCells(cells);
  };

  const gridCellElements: JSX.Element[] = [];
  const itemImageElements: JSX.Element[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const isItemOverCell = dragOverCells.some(
        ([cellX, cellY]) => cellX === x && cellY === y
      );
      gridCellElements.push(
        <GridCell
          key={`${y}-${x}`}
          x={x}
          y={y}
          dragOverCallback={handleDragOver}
          dragValidityColor={isItemOverCell ? dragValidityColor : ""}
        />
      );

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
