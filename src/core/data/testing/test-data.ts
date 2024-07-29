import { Inventory } from "../inventories/inventory";
import { CreateCandleItem } from "../inventory-items/candle";
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
  CreateTestPlayerInventory()
);

const CreateTestTraderInventory = () => {
  const testInventory: Inventory = new Inventory("testTraderInventory", 10, 8);
  testInventory.addItem(CreateCandleItem(), 0, 0);
  return testInventory;
};

export const testTrader: Trader = new Trader(
  "testTrader",
  1,
  [
    [1, 0.2],
    [2, 0.4],
    [3, 0.6],
    [4, 0.8],
  ],
  CreateTestTraderInventory()
);
