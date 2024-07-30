import TraderShop from "./core/components/trader/TraderShop";
import { testTrader } from "./core/data/testing/test-data";

function App() {
  // default browser overrides
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  return (
    <div id="game-wrapper" className="relative w-full h-full">
      <div id="ui" className="absolute h-full w-full">
        <TraderShop trader={testTrader} />
      </div>
      <canvas className="w-full h-full bg-black"></canvas>
    </div>
  );
}

export default App;
