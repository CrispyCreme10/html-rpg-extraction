import { immerable } from "immer";
import { Inventory } from "../inventories/inventory";

export type TraderItem = {
  buyPricePerUnit: number;
  sellPricePerUnit: number;
};

export class Trader {
  [immerable] = true;

  id: string;
  name: string;
  level: number;
  playerRep: number;
  repTable: number[][];
  inventory: Inventory;
  itemPrices: Map<string, TraderItem>;

  constructor(
    id: string,
    name: string,
    level: number,
    repTable: number[][],
    inventory: Inventory,
    itemPrices: Map<string, TraderItem>
  ) {
    this.id = id;
    this.name = name;
    this.level = level; // get from database
    this.playerRep = 0; // get from database
    this.repTable = repTable;
    this.inventory = inventory; // get from database
    this.itemPrices = itemPrices;
  }

  getBuyPrice(itemName: string): number {
    return this.itemPrices.get(itemName)?.buyPricePerUnit ?? 0;
  }
}
