import { Inventory } from "../data/inventories/inventory";

export class InventoryHandler {
  static instance: InventoryHandler;
  constructor() {}
  static getInstance() {
    if (!InventoryHandler.instance) {
      InventoryHandler.instance = new InventoryHandler();
    }
    return InventoryHandler.instance;
  }

  /**
   * Call this method to move an item between two inventories without checking if it's safe to do so.
   * Function assumes that the item can be moved safely.
   * @param item
   * @param sourceInventory
   * @param targetInventory
   * @returns
   */
  moveItemBetweenUnsafe(
    itemId: string,
    quantity: number,
    sourceInventory: Inventory,
    targetInventory: Inventory
  ) {
    // depending on the quantity, we may need to create multiple items in the target inventory
    // so we need to check if there is enough space for one stack at a time
    // and then move the stacked items one by one
    // flow goes as follows:
    // 1. check if there is enough space for one stack
    // 2. if there is enough space, remove the quantity of item from the source inventory
    // 3. add the new stacked item of same quantity to the target inventory
    // 4. repeat process until all items are moved OR there is no more space in the target inventory

    // get the item from the source inventory
    const item = sourceInventory.getItem(itemId);
    if (!item) {
      return;
    }

    let remainingQuanity = quantity;
    let currentQuantity = Math.min(remainingQuanity, item.maxStack);
    while (currentQuantity > 0) {
      // check if there is enough space for one stack
      const firstEmptySlot = targetInventory.findFirstEmptySlot(
        item.width,
        item.height
      );

      if (!firstEmptySlot) {
        return;
      }

      // remove the quantity of item from the source inventory
      sourceInventory.removeItemQuantity(itemId, currentQuantity);

      // add the new stacked item of same quantity to the target inventory
      targetInventory.addItem(item, firstEmptySlot.col, firstEmptySlot.row);

      // update the current quantity
      remainingQuanity -= currentQuantity;
      currentQuantity = Math.min(remainingQuanity, item.maxStack);
    }
  }
}
