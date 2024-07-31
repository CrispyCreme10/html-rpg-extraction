import { Inventory } from "../inventories/inventory";
import { arrow } from "../items";
import { Item } from "../items/item";
import { Player } from "../players/player";
import { Trader } from "../traders/trader";

const CreateTestPlayerInventory = () => {
  const testPlayerInventory: Inventory = new Inventory(
    "testPlayerInventory",
    10,
    8
  );
  return testPlayerInventory;
};

export const testPlayer: Player = new Player(
  "testPlayer",
  1,
  1_000,
  CreateTestPlayerInventory()
);

const CreateTestTraderInventory = () => {
  const testInventory: Inventory = new Inventory("testTraderInventory", 10, 8);
  testInventory.addItem(
    Item.Instantiate(arrow.name, { maxStackOverride: 200, stackOverride: 200 }),
    0,
    0
  );
  return testInventory;
};

export const testTrader: Trader = new Trader(
  "testTrader",
  "testTrader",
  1,
  [
    [1, 0.2],
    [2, 0.4],
    [3, 0.6],
    [4, 0.8],
  ],
  CreateTestTraderInventory(),
  new Map([
    [
      arrow.name,
      {
        buyPricePerUnit: 2,
        sellPricePerUnit: 1,
      },
    ],
  ])
);
