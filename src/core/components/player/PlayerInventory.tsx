import { Player } from "../../data/players/player";
import GridContainer from "../inventory-grid/GridContainer";

export type PlayerInventoryProps = {
  player: Player;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

const PlayerInventory = ({
  player,
  top,
  left,
  bottom,
  right,
}: PlayerInventoryProps) => {
  return (
    <div id="player-inventory">
      <div id="header" className="flex gap-2 text-white">
        <h1>Player Inventory</h1>
        <h2 className="text-yellow-600">Gold: {player.gold}</h2>
      </div>
      <GridContainer
        inventory={player.inventory}
        top={top}
        left={left}
        bottom={bottom}
        right={right}
      />
    </div>
  );
};
export default PlayerInventory;
