import TraderShop from "./core/components/trader/TraderShop";
import { Inventory } from "./core/data/inventories/inventory";
import { CreateCandleItem } from "./core/data/inventory-items/candle";
import { Trader } from "./core/data/traders/trader";

const testInventory: Inventory = new Inventory(10, 8);
testInventory.addItem(CreateCandleItem(), 0, 0);

const testTrader: Trader = new Trader(
  "testTrader",
  1,
  [
    [1, 0.2],
    [2, 0.4],
    [3, 0.6],
    [4, 0.8],
  ],
  testInventory
);

function App() {
  return (
    <div id="game-wrapper" className="relative w-full h-full">
      <TraderShop trader={testTrader} />
      <canvas className="w-full h-full bg-black"></canvas>
    </div>
  );
}

export default App;
