import { InventoryItem } from "../inventory-items/inventory-item";

export class Inventory {
  id: string;
  items: InventoryItem[];
  grid: number[][];
  private canAddCache = new Map<string, boolean>();

  constructor(id: string, public rows: number, public cols: number) {
    this.id = id;
    this.items = [];
    this.grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );
  }

  getItem(id: number) {
    return this.items.find((item) => item.id === id);
  }

  canAddItemAtPos(
    itemWidth: number,
    itemHeight: number,
    col: number,
    row: number
  ) {
    console.log("Checking if item can be added at position", col, row);

    // Check if item is in bounds
    if (
      col + itemWidth > this.cols ||
      row + itemHeight > this.rows ||
      col < 0 ||
      row < 0
    ) {
      return false;
    }

    // Check cache
    const cacheKey = this.getCacheKey(itemWidth, itemHeight, col, row);
    const cachedValue = this.getFromCache(cacheKey);
    if (cachedValue !== undefined) {
      console.log("Cache hit");
      return cachedValue;
    }

    // Check if item can be added
    for (let y = row; y < row + itemHeight; y++) {
      for (let x = col; x < col + itemWidth; x++) {
        if (this.grid[y][x] !== 0) {
          console.log(
            "Can't add item at position",
            itemWidth,
            itemHeight,
            col,
            row,
            x,
            y
          );
          return false;
        }
      }
    }

    return true;
  }

  addItem(item: InventoryItem, col: number, row: number) {
    if (!this.canAddItemAtPos(item.width, item.height, col, row)) {
      console.log("Can't add item");
      return;
    }

    this.items.push(item);
    for (let y = row; y < row + item.height; y++) {
      for (let x = col; x < col + item.width; x++) {
        this.grid[y][x] = item.id;
        const cacheKey = this.getCacheKey(item.width, item.height, x, y);
        this.addToCache(cacheKey, false);
      }
    }
  }

  moveItem(item: InventoryItem, col: number, row: number) {
    if (!this.canAddItemAtPos(item.width, item.height, col, row)) {
      return;
    }

    this.removeItem(item);
    this.addItem(item, col, row);
  }

  removeItem(item: InventoryItem) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          if (this.grid[y][x] === item.id) {
            this.grid[y][x] = 0;
            const cacheKey = this.getCacheKey(item.width, item.height, x, y);
            this.removeFromCache(cacheKey);
          }
        }
      }
    }
  }

  private addToCache(key: string, value: boolean) {
    this.canAddCache.set(key, value);
  }

  private getFromCache(key: string) {
    return this.canAddCache.get(key);
  }

  private getCacheKey(
    itemWidth: number,
    itemHeight: number,
    col: number,
    row: number
  ) {
    return `${itemWidth}-${itemHeight}-${col}-${row}`;
  }

  private removeFromCache(key: string) {
    this.canAddCache.delete(key);
  }

  private clearCache() {
    this.canAddCache.clear();
  }
}
