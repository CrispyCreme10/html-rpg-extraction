import { create } from "zustand";
import { testPlayer, testTrader } from "../data/testing/test-data";
import { Player } from "../data/players/player";
import { Trader } from "../data/traders/trader";
import { immer } from "zustand/middleware/immer";
import { items } from "../data/items";
import { Item } from "../data/items/item";

interface GameState {
  gameState: {
    player: Player;
    traders: Trader[];
  };
}

interface GameActions {
  playerBuyTraderItem: (
    traderId: string,
    itemId: string,
    quantity: number
  ) => void;
}

export const useGameStore = create<GameState & GameActions>()(
  immer((set) => ({
    gameState: {
      player: testPlayer,
      traders: [testTrader],
    },
    playerBuyTraderItem: (traderId: string, itemId: string, quantity: number) =>
      set((state) => {
        const { gameState } = state;

        const trader = gameState.traders.find((t) => t.id === traderId);
        if (!trader) {
          throw new Error("Trader not found");
        }

        const traderItem = trader.inventory.getItem(itemId);
        if (!traderItem) {
          throw new Error("Item not found in trader inventory");
        }

        const itemTemplate = items.get(traderItem.name);
        if (!itemTemplate) {
          throw new Error("Item not found");
        }

        const buyPricePerUnit = trader.getBuyPrice(traderItem.name);
        if (buyPricePerUnit === 0) {
          throw new Error("Item not configured for trader");
        }

        let remainingQuanity = quantity;
        let currentQuantity = Math.min(remainingQuanity, itemTemplate.maxStack);
        while (currentQuantity > 0) {
          // should check this prior to state update
          const totalPrice = buyPricePerUnit * currentQuantity;
          if (gameState.player.gold < totalPrice) {
            throw new Error("Not enough gold to buy item");
          }

          // check if there is enough space for one stack
          const firstEmptySlot = gameState.player.inventory.findFirstEmptySlot(
            itemTemplate.width,
            itemTemplate.height
          );

          if (!firstEmptySlot) {
            return;
          }

          // remove the quantity of item from the source inventory
          trader.inventory.removeItemQuantity(itemId, currentQuantity);

          // add the new stacked item of same quantity to the target inventory
          const newItem = Item.Instantiate(itemTemplate.name, {
            stackOverride: currentQuantity,
          });
          gameState.player.inventory.addItem(
            newItem,
            firstEmptySlot.col,
            firstEmptySlot.row
          );

          // update player gold
          gameState.player.gold -= totalPrice;

          // update the current quantity
          remainingQuanity -= currentQuantity;
          currentQuantity = Math.min(remainingQuanity, itemTemplate.maxStack);
        }
      }),
  }))
);
