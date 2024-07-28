import { InventoryItem } from "../inventory-items/inventory-item";

export class Inventory {
  items: InventoryItem[];
  grid: number[][];

  constructor(public rows: number, public cols: number) {
    this.items = [];
    this.grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );
    console.log(this.grid);
  }

  getItem(id: number) {
    return this.items.find((item) => item.id === id);
  }

  addItem(item: InventoryItem, x: number, y: number) {
    if (!this.canAddItemAtPos(item.width, item.height, x, y)) {
      return;
    }

    this.items.push(item);
    this.grid[x][y] = item.id;
  }

  canAddItemAtPos(itemWidth: number, itemHeight: number, x: number, y: number) {
    if (x + itemWidth > this.rows || y + itemHeight > this.cols) {
      return false;
    }

    for (let i = x; i < x + itemWidth; i++) {
      for (let j = y; j < y + itemHeight; j++) {
        if (this.grid[i][j] !== 0) {
          return false;
        }
      }
    }

    return true;
  }

  removeItem(item: InventoryItem) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}
