import { immerable, produce } from "immer";
import { InventoryItem } from "../items/item";

const EMPTY_SLOT_VALUE = "";

export class Inventory {
  [immerable] = true;

  id: string;
  items: InventoryItem[];
  grid: string[][];
  private canAddCache = new Map<string, boolean>();

  constructor(id: string, public rows: number, public cols: number) {
    this.id = id;
    this.items = [];
    this.grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => EMPTY_SLOT_VALUE)
    );
  }

  itemExists(itemId: string) {
    return this.items.some((item) => item.id === itemId);
  }

  getItem(itemId: string): InventoryItem | undefined {
    return this.items.find((item) => item.id === itemId);
  }

  getItemPos(itemId: string): { x: number; y: number } | null {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.grid[y][x] === itemId) {
          return { x, y };
        }
      }
    }

    return null;
  }

  canAddItemAtPos(
    itemWidth: number,
    itemHeight: number,
    col: number,
    row: number
  ) {
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
        if (this.grid[y][x] !== EMPTY_SLOT_VALUE) {
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

  findFirstEmptySlot(
    itemWidth: number,
    itemHeight: number
  ): { col: number; row: number } | null {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.canAddItemAtPos(itemWidth, itemHeight, col, row)) {
          return { col, row };
        }
      }
    }

    return null;
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

  moveItem(itemId: string, col: number, row: number) {
    const item = this.getItem(itemId);
    if (!item) {
      return;
    }

    if (!this.canAddItemAtPos(item.width, item.height, col, row)) {
      return;
    }

    this.removeItem(itemId);
    this.addItem(item, col, row);
  }

  removeItemQuantity(itemId: string, quantity: number) {
    const item = this.getItem(itemId);
    if (!item) {
      return;
    }

    if (item.stack === quantity) {
      this.removeItem(itemId);
    } else if (item.stack > quantity) {
      const newItem = produce(item, (draftItem) => {
        draftItem.stack -= quantity;
      });
      this.items.splice(this.items.indexOf(item), 1, newItem);
    }
  }

  removeItem(itemId: string) {
    const item = this.getItem(itemId);
    if (!item) {
      return;
    }

    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          if (this.grid[y][x] === item.id) {
            this.grid[y][x] = EMPTY_SLOT_VALUE;
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
}
