import { InventoryItem } from "../inventory-items/inventory-items";

export class Inventory {
  items: InventoryItem[];

  constructor() {
    this.items = [];
  }

  addItem(item: InventoryItem) {
    this.items.push(item);
  }

  removeItem(item: InventoryItem) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}
