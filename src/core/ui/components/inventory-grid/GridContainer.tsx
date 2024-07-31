import { CSSProperties, useRef, useState } from "react";
import { CSSProperties, useRef, useState } from "react";
import GridCell from "./GridCell";
import { Inventory } from "../../../data/inventories/inventory";
import InventoryItem from "../inventory-item/InventoryItem";
import { DragDropHandler } from "../../../singletons/drag-drop";
import { InventoryItem as Item } from "../../../data/items/item";

export type GridContainerProps = {
  inventory: Inventory;
  itemsDraggable?: boolean;
  itemsSelectable?: boolean;
  itemsDraggable?: boolean;
  itemsSelectable?: boolean;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  itemSelectedCallback?: (item: Item) => void;
  itemSelectedCallback?: (item: Item) => void;
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
  itemsDraggable = true,
  itemsSelectable = true,
  itemsDraggable = true,
  itemsSelectable = true,
  top = 0,
  left = 0,
  bottom = 0,
  right = 0,
  itemSelectedCallback,
  itemSelectedCallback,
}: GridContainerProps) => {
  const [dragOverCells, setDragOverCells] = useState<[number, number][]>([]);
  const [dragValidityColor, setDragValidityColor] =
    useState<DragValidityColor>("");
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const rows = inventory.rows;
  const cols = inventory.cols;
  const grid = inventory.grid;

  // const DRAG_AUTO_SCROLL_SPEED = 50;
  // const DRAG_AUTO_SCROLL_TIMEOUT = 100;

  // const DRAG_AUTO_SCROLL_SPEED = 50;
  // const DRAG_AUTO_SCROLL_TIMEOUT = 100;

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

  const handleGridContainerDragEnd = () => {
    setDragOverCells([]);
  };

  const handleGridContainerDragEnd = () => {
    setDragOverCells([]);
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
        handleGridContainerDragEnd();
        handleGridContainerDragEnd();
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
      DragDropHandler.getInstance().setTargetInventory(
        inventory,
        handleGridContainerDragEnd
      );
      DragDropHandler.getInstance().setTargetInventory(
        inventory,
        handleGridContainerDragEnd
      );
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

  const onItemClick = (event: React.MouseEvent, item: Item) => {
    if (event.button === 0) {
      if (itemsSelectable && itemSelectedCallback) {
        itemSelectedCallback(item);
      }
    } else if (event.button === 2) {
      console.log("Item right clicked", item);
    }
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
          <InventoryItem
            key={item.id}
            item={item}
            x={x}
            y={y}
            itemClickCallback={onItemClick}
            dragStartCallback={itemsDraggable ? handleDragStart : undefined}
            itemClickCallback={onItemClick}
            dragStartCallback={itemsDraggable ? handleDragStart : undefined}
          />
        );
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
      ref={gridContainerRef}
      ref={gridContainerRef}
      style={gridContainerStyles}
      className="relative h-full w-fit overflow-x-hidden overflow-y-auto"
      onMouseLeave={handleMouseLeave}
      // onMouseMove={handleMouseMove}
      // onMouseMove={handleMouseMove}
    >
      <div
        id="grid-cell-elements"
        style={gridCellElementStyles}
        className="grid"
      >
        {gridCellElements}
      </div>
      <div id="inventory-item-elements" className="absolute top-0 left-0">
        {itemImageElements}
      </div>
    </div>
  );
};

export default GridContainer;
