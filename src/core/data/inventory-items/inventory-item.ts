export class InventoryItem {
  id: number;
  name: string;
  shortName: string; // ideally under 15/20 characters - can test this
  description: string;
  image: string;
  category: ItemCategory;
  width: number;
  height: number;
  buyPrice: number;
  sellPrice: number;
  stackable: boolean = false;
  maxStack: number = 1;
  stack: number;

  constructor(
    id: number,
    name: string,
    shortName: string,
    description: string,
    imgUrl: string,
    category: ItemCategory,
    width: number,
    height: number,
    buyPrice: number,
    sellPrice: number,
    stackable: boolean = false,
    maxStack: number = 1,
    stack: number = 1
  ) {
    this.id = id;
    this.name = name;
    this.shortName = shortName;
    this.description = description;
    this.image = imgUrl;
    this.category = category;
    this.width = width;
    this.height = height;
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
    this.stackable = stackable;
    this.maxStack = maxStack;
    this.stack = stack;
  }
}

export enum ItemCategory {
  WEAPON,
  ARMOR,
  CONSUMABLE,
  MISC,
}
