import { useGameStore } from "./core/engine/zustand";
import TraderShop from "./core/ui/components/trader/TraderShop";

function App() {
  // const gameState = useGameEngine();
  const testTrader = useGameStore((state) => state.gameState.traders[0]);

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
