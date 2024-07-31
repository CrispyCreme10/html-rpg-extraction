import { immerable } from "immer";
import { items } from ".";
import { uuid } from "../testing/uuid";

export class Item {
  name: string; // uniquely identifies the item template
  shortName: string; // ideally under 15/20 characters - can test this
  description: string;
  image: string;
  category: ItemCategory;
  width: number;
  height: number;
  weight: number;
  maxStack: number = 1;

  constructor(
    name: string,
    shortName: string,
    description: string,
    imgUrl: string,
    category: ItemCategory,
    width: number,
    height: number,
    weight: number,
    maxStack: number = 1
  ) {
    this.name = name;
    this.shortName = shortName;
    this.description = description;
    this.image = imgUrl;
    this.category = category;
    this.width = width;
    this.height = height;
    this.weight = weight;
    this.maxStack = maxStack;
  }

  static Instantiate = (
    itemName: string,
    { maxStackOverride = 0, stackOverride = 0 } = {}
  ): InventoryItem => {
    const item = items.get(itemName);
    if (!item) {
      throw new Error("Item not found");
    }
    return new InventoryItem(
      uuid(),
      item.name,
      item.shortName,
      item.description,
      item.image,
      item.category,
      item.width,
      item.height,
      item.weight,
      maxStackOverride || item.maxStack,
      stackOverride || 1
    );
  };
}

/**
 * Concrete class for an item that can be stored in an inventory
 */
export class InventoryItem extends Item {
  [immerable] = true;

  id: string;
  stack: number;

  constructor(
    id: string,
    name: string,
    shortName: string,
    description: string,
    imgUrl: string,
    category: ItemCategory,
    width: number,
    height: number,
    weight: number,
    maxStack: number = 1,
    stack: number = 1
  ) {
    super(
      name,
      shortName,
      description,
      imgUrl,
      category,
      width,
      height,
      weight,
      maxStack
    );
    this.id = id;
    this.stack = stack;
  }
}

export enum ItemCategory {
  WEAPON,
  ARMOR,
  CONSUMABLE,
  MISC,
}
