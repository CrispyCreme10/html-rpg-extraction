import { CSSProperties } from "react";
import { InventoryItem as Item } from "../../data/inventory-items/inventory-item";
import { GRID_CELL_SIZE } from "../../constants/grid-cell";

export type InventoryItemProps = {
  item: Item;
  x: number;
  y: number;
};

const InventoryItem = ({ item, x, y }: InventoryItemProps) => {
  const inventoryItemStyles: CSSProperties = {
    width: `${GRID_CELL_SIZE * item.width}px`,
    height: `${GRID_CELL_SIZE * item.height}px`,
    top: `${GRID_CELL_SIZE * y}px`,
    left: `${GRID_CELL_SIZE * x}px`,
  };

  const imageStyles: CSSProperties = {
    width: "85%",
    height: "85%",
  };

  const textStyles: CSSProperties = {
    fontSize: "0.7rem",
  };

  return (
    <div
      style={inventoryItemStyles}
      className="absolute flex justify-center items-center bg-blue-950 hover:bg-blue-900 border-2 border-white/30 text-white"
    >
      <img
        src={item.image}
        alt={item.name}
        style={imageStyles}
        className="object-cover"
      />
      <span style={textStyles} className="absolute top-0 right-1">
        {item.shortName}
      </span>
      <span style={textStyles} className="absolute bottom-0 right-1">
        {item.stack}
      </span>
      <img
        src={`/assets/item-categories/${item.category}`}
        alt="Item Category"
        className="absolute bottom-0 left-0 w-3 h-3"
      />
    </div>
  );
};
export default InventoryItem;
