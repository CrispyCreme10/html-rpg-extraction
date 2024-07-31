import { Item, ItemCategory } from "./item";
import arrowImgUrl from "../../../assets/images/items/arrow.png";

// this file represents the data for all items in the game
// ideally this will get moved to a database and a specific tool will be used to create this and store it

export const arrow: Item = {
  name: "Arrow", // unique identifier
  shortName: "Arrow",
  description: "A simple arrow.",
  image: arrowImgUrl,
  category: ItemCategory.MISC,
  width: 1,
  height: 1,
  weight: 0.05,
  maxStack: 50,
};

export const items = new Map<string, Item>([[arrow.name, arrow]]);
