import { useGameStore } from "../../../engine/zustand";
import GridContainer from "../inventory-grid/GridContainer";

export type PlayerInventoryProps = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

const PlayerInventory = ({
  top,
  left,
  bottom,
  right,
}: PlayerInventoryProps) => {
  const playerGold = useGameStore((state) => state.gameState.player.gold);
  const playerInventory = useGameStore(
    (state) => state.gameState.player.inventory
  );

  return (
    <div id="player-inventory">
      <div id="header" className="flex gap-2 text-white">
        <h1>Player Inventory</h1>
        <h2 className="text-yellow-600">Gold: {playerGold}</h2>
      </div>
      <GridContainer
        inventory={playerInventory}
        top={top}
        left={left}
        bottom={bottom}
        right={right}
      />
    </div>
  );
};
export default PlayerInventory;
