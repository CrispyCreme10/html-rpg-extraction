import { CSSProperties, useRef, useState } from "react";
import { InventoryItem as Item } from "../../../data/items/item";
import { GRID_CELL_SIZE } from "../../../constants/grid-cell";

export type InventoryItemProps = {
  item: Item;
  x: number;
  y: number;
  itemClickCallback?: (event: React.MouseEvent, item: Item) => void;
  dragStartCallback?: (
    item: Item,
    itemImgElement: HTMLImageElement,
    itemFirstDragMoveFn: () => void,
    itemDragEndFn: () => void
  ) => void;
};

const InventoryItem = ({
  item,
  x,
  y,
  itemClickCallback,
  dragStartCallback,
}: InventoryItemProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const itemImgRef = useRef<HTMLImageElement>(null);

  const defaultInventoryItemClasses =
    "absolute flex justify-center items-center bg-blue-950 hover:bg-blue-900 border-x border-y border-white/30 text-white";
  const draggingInventoryItemClasses =
    "absolute flex justify-center items-center pointer-events-none";

  const inventoryItemStyles: CSSProperties = {
    width: `${GRID_CELL_SIZE * item.width}px`,
    height: `${GRID_CELL_SIZE * item.height}px`,
    top: `${GRID_CELL_SIZE * y}px`,
    left: `${GRID_CELL_SIZE * x}px`,
  };

  const imageStyles: CSSProperties = {
    width: "75%",
    height: "75%",
  };

  const textStyles: CSSProperties = {
    fontSize: "0.55rem",
  };

  const handleFirstDragMove = () => {
    console.log("First drag move");
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    console.log("Drag end");
    setIsDragging(false);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!dragStartCallback) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    dragStartCallback(
      item,
      itemImgRef.current!,
      handleFirstDragMove,
      handleDragEnd
    );
  };

  const handleMouseUp = () => {
    console.log("Mouse up");

    setIsDragging(false);
  };

  const handleClick = (event: React.MouseEvent) => {
    itemClickCallback?.(event, item);
  };

  return (
    <div
      style={inventoryItemStyles}
      className={
        !isDragging ? defaultInventoryItemClasses : draggingInventoryItemClasses
      }
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <img
        src={item.image}
        alt={item.name}
        ref={itemImgRef}
        style={imageStyles}
        className="object-cover"
      />
      {!isDragging && (
        <span style={textStyles} className="absolute top-0 right-1">
          {item.shortName}
        </span>
      )}
      {!isDragging && item.stack > 1 && (
        <span style={textStyles} className="absolute bottom-0 right-1">
          {item.stack}
        </span>
      )}
      {/* SHOW this after implementing item categories and getting an icon for each */}
      {/* {!isDragging && (
        <img
          src={`/assets/item-categories/${item.category}`}
          alt="Item Category"
          className="absolute bottom-0 left-0 w-3 h-3"
        />
      )} */}
    </div>
  );
};
export default InventoryItem;