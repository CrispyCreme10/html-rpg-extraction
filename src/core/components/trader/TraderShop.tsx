import { Trader } from "../../data/traders/trader";
import GridContainer from "../inventory-grid/GridContainer";

export type TraderShopProps = {
  trader: Trader;
};

const TraderShop = ({ trader }: TraderShopProps) => {
  return (
    <div id="trader-shop">
      <GridContainer inventory={trader.inventory} x={10} y={10} />
    </div>
  );
};
export default TraderShop;
