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
