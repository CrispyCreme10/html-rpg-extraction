import { useState } from "react";
import { testPlayer } from "../../data/testing/test-data";
import { Trader } from "../../data/traders/trader";
import GridContainer from "../inventory-grid/GridContainer";
import PlayerInventory from "../player/PlayerInventory";
import PurchaseSection from "./PurchaseSection";
import { InventoryItem } from "../../data/inventory-items/inventory-item";

export type TraderShopProps = {
  trader: Trader;
};

const TraderShop = ({ trader }: TraderShopProps) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | undefined>(
    undefined
  );

  return (
    <div id="trader-shop" className="flex h-full justify-between">
      <GridContainer
        inventory={trader.inventory}
        itemsDraggable={false}
        itemsSelectable={true}
        left={10}
        itemSelectedCallback={(item) => setSelectedItem(item)}
      />
      {selectedItem && <PurchaseSection item={selectedItem} />}
      <PlayerInventory player={testPlayer} right={10} />
    </div>
  );
};
export default TraderShop;
