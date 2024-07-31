import gameEngine from "../../../engine/game-engine";
import GridContainer from "../inventory-grid/GridContainer";
import { Inventory } from "../../../data/inventories/inventory";
import { Trader } from "../../../data/traders/trader";

export type SellSectionProps = {
  trader: Trader;
};

const SellSection = ({ trader }: SellSectionProps) => {
  const sellInventory = new Inventory("sell-inventory", 10, 8);

  const handleSellClick = () => {
    const itemIds = sellInventory.items.map((item) => item.id);
    gameEngine.playerSellTraderItems(trader.id, itemIds);
  };

  return (
    <div>
      <GridContainer inventory={sellInventory} />
      <button
        onClick={handleSellClick}
        className="text-white bg-blue-950 border-2 border-white/30 p-2"
      >
        Sell
      </button>
    </div>
  );
};
export default SellSection;
