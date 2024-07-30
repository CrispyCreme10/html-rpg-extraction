import TraderShop from "./core/components/trader/TraderShop";
import { useGameEngine } from "./core/hooks/use-game-engine";

function App() {
  const gameState = useGameEngine();

  // default browser overrides
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  return (
    <div id="game-wrapper" className="relative w-full h-full">
      <div id="ui" className="absolute h-full w-full">
        <TraderShop trader={gameState.traders[0]} />
      </div>
      <canvas className="w-full h-full bg-black"></canvas>
    </div>
  );
}

export default App;
