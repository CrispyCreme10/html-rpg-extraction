import { Inventory } from "../inventories/inventory";

export class Player {
  name: string;
  level: number;
  gold: number;
  inventory: Inventory;

  constructor(name: string, level: number, gold: number, inventory: Inventory) {
    this.name = name; // get from database
    this.level = level; // get from database
    this.gold = gold; // get from database
    this.inventory = inventory; // get from database
  }
}
