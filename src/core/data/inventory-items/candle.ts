import { InventoryItem, ItemCategory } from "./inventory-item";

export const CreateCandleItem = () =>
  new InventoryItem(
    1,
    "Candle",
    "Candle",
    "A candle to light your way.",
    "https://png.pngtree.com/png-clipart/20240707/original/pngtree-glowing-candle-semi-flat-color-object-png-image_15513126.png",
    ItemCategory.MISC,
    4,
    5
  );
