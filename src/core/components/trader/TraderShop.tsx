import { testPlayer } from "../../data/testing/test-data";
import { Trader } from "../../data/traders/trader";
import GridContainer from "../inventory-grid/GridContainer";
import PlayerInventory from "../player/PlayerInventory";

export type TraderShopProps = {
  trader: Trader;
};

const TraderShop = ({ trader }: TraderShopProps) => {
  return (
    <div id="trader-shop">
      <GridContainer inventory={trader.inventory} top={10} left={10} />
      <PlayerInventory player={testPlayer} top={10} right={10} />
    </div>
  );
};
export default TraderShop;
