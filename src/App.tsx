import TraderShop from "./core/components/trader/TraderShop";
import { testTrader } from "./core/data/testing/test-data";

function App() {
  return (
    <div id="game-wrapper" className="relative w-full h-full">
      <TraderShop trader={testTrader} />
      <canvas className="w-full h-full bg-black"></canvas>
    </div>
  );
}

export default App;
