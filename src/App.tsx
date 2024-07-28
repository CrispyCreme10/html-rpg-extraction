import TraderShop from "./core/components/trader/TraderShop";

function App() {
  return (
    <div id="game-wrapper" className="relative w-full h-full">
      <TraderShop />
      <canvas className="w-full h-full bg-black"></canvas>
    </div>
  );
}

export default App;
