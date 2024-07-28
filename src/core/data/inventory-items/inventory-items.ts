export class InventoryItem {
  name: string;
  description: string;
  imgUrl: string;
  width: number;
  height: number;
  stackable: boolean = false;
  maxStack: number = 1;
  stack: number;

  constructor(
    name: string,
    description: string,
    imgUrl: string,
    width: number,
    height: number,
    stackable: boolean = false,
    maxStack: number = 1,
    stack: number = 1
  ) {
    this.name = name;
    this.description = description;
    this.imgUrl = imgUrl;
    this.width = width;
    this.height = height;
    this.stackable = stackable;
    this.maxStack = maxStack;
    this.stack = stack;
  }
}
