import { Inventory } from "../data/inventories/inventory";
import { InventoryItem } from "../data/inventory-items/inventory-item";

export class DragDropHandler {
  private static instance: DragDropHandler;

  private constructor() {}

  static getInstance(): DragDropHandler {
    if (!DragDropHandler.instance) {
      DragDropHandler.instance = new DragDropHandler();
    }

    return DragDropHandler.instance;
  }

  get isDragging(): boolean {
    return this.draggedItem !== null;
  }

  private draggedItem: InventoryItem | null = null;
  private newItemPos: { x: number; y: number } | null = null;
  private originalInventory: Inventory | null = null;
  private targetInventory: Inventory | null = null;

  // event handlers
  handleMouseUp: () => void = () => {};
  handleMouseMove: (event: MouseEvent) => void = () => {};

  dragStart(
    item: InventoryItem,
    originalInventory: Inventory,
    itemImgElement: HTMLImageElement,
    firstDragMoveCallback: () => void,
    dragEndCallback: () => void
  ) {
    // initialize
    this.setDraggedItem(item);
    this.setOriginalInventory(originalInventory);
    this.setTargetInventory(originalInventory);

    // add item to img element and append to body
    const dragImg = this.initializeDragImage(itemImgElement);

    // handle mouse up event
    this.handleMouseUp = () => {
      this.tryMoveItem();

      dragImg.remove();
      this.dragEnd();
      dragEndCallback();
    };

    document.addEventListener("mouseup", this.handleMouseUp);

    // handle mouse move event
    let performedFirstMove = false;
    this.handleMouseMove = (event) => {
      console.log("drag drop mousemove");
      if (!performedFirstMove) {
        firstDragMoveCallback();
        performedFirstMove = true;
      }

      dragImg.style.top = `${event.clientY - dragImg.clientHeight / 2}px`;
      dragImg.style.left = `${event.clientX - dragImg.clientWidth / 2}px`;
    };
    document.addEventListener("mousemove", this.handleMouseMove);
  }

  private initializeDragImage(itemImgElement: HTMLImageElement) {
    const dragImg = itemImgElement.cloneNode() as HTMLImageElement;
    dragImg.style.position = "absolute";
    dragImg.style.width = itemImgElement.width + "px";
    dragImg.style.height = itemImgElement.height + "px";
    dragImg.style.opacity = "0.5";
    dragImg.style.zIndex = "9999";
    dragImg.style.pointerEvents = "none";
    document.body.appendChild(dragImg);
    return dragImg;
  }

  tryMoveItem(): void {
    if (this.newItemPos !== null && this.draggedItem !== null) {
      this.originalInventory?.removeItem(this.draggedItem);
      this.targetInventory?.addItem(
        this.draggedItem,
        this.newItemPos.x,
        this.newItemPos.y
      );
    }
  }

  setDraggedItem(item: InventoryItem) {
    this.draggedItem = item;
  }

  setNewItemPos(x: number, y: number) {
    if (x < 0 || y < 0 || isNaN(x) || isNaN(y)) {
      this.newItemPos = null;
      return;
    }
    this.newItemPos = { x, y };
  }

  setOriginalInventory(inventory: Inventory) {
    this.originalInventory = inventory;
  }

  setTargetInventory(inventory: Inventory) {
    this.targetInventory = inventory;
  }

  getDraggedItem() {
    return this.draggedItem;
  }

  clearDraggedItem() {
    this.draggedItem = null;
  }

  clearNewItemPos() {
    this.newItemPos = null;
  }

  clearOriginalInventory() {
    this.originalInventory = null;
  }

  clearTargetInventory() {
    this.targetInventory = null;
  }

  removeHandlers() {
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("mousemove", this.handleMouseMove);
  }

  dragEnd() {
    this.clearDraggedItem();
    this.clearNewItemPos();
    this.clearOriginalInventory();
    this.clearTargetInventory();
    this.removeHandlers();
  }
}
