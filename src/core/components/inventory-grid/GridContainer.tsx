import { CSSProperties, useState } from "react";
import GridCell from "./GridCell";
import { Inventory } from "../../data/inventories/inventory";
import InventoryItem from "../inventory-item/InventoryItem";
import { DragDropHandler } from "../../singletons/drag-drop";
import { InventoryItem as Item } from "../../data/inventory-items/inventory-item";

export type GridContainerProps = {
  inventory: Inventory;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

export type DragOverType = (
  mouseX: number,
  mouseY: number,
  isPastHalfVertical: boolean,
  isPastHalfHorizontal: boolean
) => void;

export type DragValidityColor = "valid" | "invalid" | "";

const GridContainer = ({
  inventory,
  top = 0,
  left = 0,
  bottom = 0,
  right = 0,
}: GridContainerProps) => {
  const [dragOverCells, setDragOverCells] = useState<[number, number][]>([]);
  const [dragValidityColor, setDragValidityColor] =
    useState<DragValidityColor>("");

  const rows = inventory.rows;
  const cols = inventory.cols;
  const grid = inventory.grid;

  const gridContainerStyles: CSSProperties = {
    top: top ? `${top}px` : "",
    left: left ? `${left}px` : "",
    bottom: bottom ? `${bottom}px` : "",
    right: right ? `${right}px` : "",
  };

  const gridCellElementStyles: CSSProperties = {
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
  };

  const handleDragStart = (
    item: Item,
    itemImgElement: HTMLImageElement,
    itemFirstDragMoveFn: () => void,
    itemDragEndFn: () => void
  ) => {
    DragDropHandler.getInstance().dragStart(
      item,
      inventory,
      itemImgElement,
      () => {
        itemFirstDragMoveFn();
      },
      () => {
        itemDragEndFn();
        setDragOverCells([]);
      }
    );
  };

  const handleDragOver = (
    mouseX: number,
    mouseY: number,
    isPastHalfVertical: boolean,
    isPastHalfHorizontal: boolean
  ) => {
    const itemWidth = DragDropHandler.getInstance().getDraggedItem()?.width;
    const itemHeight = DragDropHandler.getInstance().getDraggedItem()?.height;

    if (!itemWidth || !itemHeight) {
      return;
    }

    const xAdjust =
      mouseX -
      Math.floor(itemWidth / 2) +
      (isPastHalfVertical && itemWidth % 2 === 0 ? 1 : 0);
    const yAdjust =
      mouseY -
      Math.floor(itemHeight / 2) +
      (isPastHalfHorizontal && itemHeight % 2 === 0 ? 1 : 0);

    const canAddItem = inventory.canAddItemAtPos(
      itemWidth,
      itemHeight,
      xAdjust,
      yAdjust
    );

    setDragValidityColor(canAddItem ? "valid" : "invalid");
    if (canAddItem) {
      // not useful when an internal drag is happening
      // but useful when dragging from another inventory
      DragDropHandler.getInstance().setTargetInventory(inventory);
      DragDropHandler.getInstance().setNewItemPos(xAdjust, yAdjust);
    } else {
      DragDropHandler.getInstance().setNewItemPos(-1, -1);
    }

    const cells: [number, number][] = [];
    for (let y = 0; y < itemHeight; y++) {
      for (let x = 0; x < itemWidth; x++) {
        cells.push([xAdjust + x, yAdjust + y]);
      }
    }

    setDragOverCells(cells);
  };

  const gridCellElements: JSX.Element[] = [];
  const itemImageElements: JSX.Element[] = [];
  const placedItems: number[] = [];
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
        if (placedItems.includes(itemId)) {
          continue;
        }
        itemImageElements.push(
          <InventoryItem
            key={itemId}
            item={item}
            x={x}
            y={y}
            dragStartCallback={handleDragStart}
          />
        );
        placedItems.push(itemId);
      }
    }
  }

  const handleMouseLeave = () => {
    setDragOverCells([]);
    setDragValidityColor("");
  };

  return (
    <div
      id="grid-container"
      style={gridContainerStyles}
      className="absolute"
      onMouseLeave={handleMouseLeave}
    >
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
