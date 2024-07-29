import { Inventory } from "../inventories/inventory";

export class Player {
  name: string;
  level: number;
  inventory: Inventory;

  constructor(name: string, level: number, inventory: Inventory) {
    this.name = name;
    this.level = level;
    this.inventory = inventory;
  }
}
