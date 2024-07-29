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

  private draggedItem: InventoryItem | null = null;

  dragStart(
    item: InventoryItem,
    itemImgElement: HTMLImageElement,
    firstDragMoveCallback: () => void,
    dragEndCallback: () => void
  ) {
    this.setDraggedItem(item);

    // add item to img element and append to body
    const dragImg = itemImgElement.cloneNode() as HTMLImageElement;
    dragImg.style.position = "absolute";
    dragImg.style.width = itemImgElement.width + "px";
    dragImg.style.height = itemImgElement.height + "px";
    dragImg.style.opacity = "0.5";
    dragImg.style.zIndex = "9999";
    dragImg.style.pointerEvents = "none";
    document.body.appendChild(dragImg);

    document.addEventListener("mouseup", () => {
      dragImg.remove();
      this.clearDraggedItem();
      dragEndCallback();
    });

    let performedFirstMove = false;
    document.addEventListener("mousemove", (event) => {
      if (!performedFirstMove) {
        firstDragMoveCallback();
        performedFirstMove = true;
      }

      dragImg.style.top = `${event.clientY - dragImg.clientHeight / 2}px`;
      dragImg.style.left = `${event.clientX - dragImg.clientWidth / 2}px`;
    });
  }

  setDraggedItem(item: InventoryItem) {
    this.draggedItem = item;
  }

  getDraggedItem() {
    return this.draggedItem;
  }

  clearDraggedItem() {
    this.draggedItem = null;
  }
}
