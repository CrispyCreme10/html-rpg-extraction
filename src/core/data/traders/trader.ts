import { Inventory } from "../inventories/inventory";

export class Trader {
  name: string;
  level: number;
  playerRep: number;
  repTable: number[][];
  inventory: Inventory;

  constructor(
    name: string,
    level: number,
    repTable: number[][],
    inventory: Inventory
  ) {
    this.name = name;
    this.level = level; // get from database
    this.playerRep = 0; // get from database
    this.repTable = repTable;
    this.inventory = inventory; // get from database
  }
}
