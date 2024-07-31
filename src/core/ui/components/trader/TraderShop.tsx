import { useState } from "react";
import { Trader } from "../../../data/traders/trader";
import GridContainer from "../inventory-grid/GridContainer";
import PlayerInventory from "../player/PlayerInventory";
import PurchaseSection from "./PurchaseSection";

export type TraderShopProps = {
  trader: Trader;
};

const TraderShop = ({ trader }: TraderShopProps) => {
  // const gameState = useGameEngine();

  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(
    undefined
  );

  const item = selectedItemId
    ? trader.inventory.getItem(selectedItemId)
    : undefined;

  return (
    <div id="trader-shop" className="flex h-full justify-between">
      <GridContainer
        inventory={trader.inventory}
        itemsDraggable={false}
        itemsSelectable={true}
        left={10}
        itemSelectedCallback={(item) => setSelectedItemId(item.id)}
      />
      {item && <PurchaseSection item={item} trader={trader} />}
      <PlayerInventory right={10} />
    </div>
  );
};
export default TraderShop;
