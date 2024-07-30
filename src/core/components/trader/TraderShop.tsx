import { useState } from "react";
import { Trader } from "../../data/traders/trader";
import GridContainer from "../inventory-grid/GridContainer";
import PlayerInventory from "../player/PlayerInventory";
import PurchaseSection from "./PurchaseSection";
import { InventoryItem } from "../../data/inventory-items/inventory-item";
import { InventoryHandler } from "../../singletons/inventory-handler";
import { useGameEngine } from "../../hooks/use-game-engine";

export type TraderShopProps = {
  trader: Trader;
};

const TraderShop = ({ trader }: TraderShopProps) => {
  const gameState = useGameEngine();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | undefined>(
    undefined
  );

  const handleBuyItem = (itemId: number, quantity: number) => {
    InventoryHandler.getInstance().moveItemBetweenUnsafe(
      itemId,
      quantity,
      trader.inventory,
      gameState.player.inventory
    );
  };

  const handleSellItem = (
    itemId: number,
    quantity: number,
    sellPrice: number
  ) => {
    gameState.player.inventory.removeItemQuantity(itemId, quantity);
    gameState.player.gold += quantity * sellPrice;
  };

  return (
    <div id="trader-shop" className="flex h-full justify-between">
      <GridContainer
        inventory={trader.inventory}
        itemsDraggable={false}
        itemsSelectable={true}
        left={10}
        itemSelectedCallback={(item) => setSelectedItem(item)}
      />
      {selectedItem && (
        <PurchaseSection
          item={selectedItem}
          buyItemCallback={handleBuyItem}
          sellItemCallback={handleSellItem}
        />
      )}
      <PlayerInventory player={gameState.player} right={10} />
    </div>
  );
};
export default TraderShop;
