import { produce, WritableDraft } from "immer";
import { Player } from "../data/players/player";
import { testPlayer, testTrader } from "../data/testing/test-data";
import { Trader } from "../data/traders/trader";
import { items } from "../data/items";
import { Item } from "../data/items/item";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CallbackFunctionVariadic = (...args: any[]) => void;

export interface GameState {
  player: Player;
  traders: Trader[];
}

class GameEngine {
  state: GameState;
  listeners: CallbackFunctionVariadic[];

  constructor() {
    this.state = this.initializeState();
    this.listeners = [];
  }

  private initializeState(): GameState {
    return {
      player: testPlayer,
      traders: [testTrader],
    };
  }

  updateGameState(
    producer: (
      draft: WritableDraft<GameState>
    ) => void | WritableDraft<GameState> | undefined
  ) {
    this.state = produce(this.state, producer);
    this.notifyListeners();
  }

  onStateChange(listener: CallbackFunctionVariadic) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  // Game mutation methods

  // Player methods
  increasePlayerGold(amount: number) {
    this.updateGameState((draft) => {
      draft.player.gold += amount;
    });
  }

  decreasePlayerGold(amount: number) {
    this.updateGameState((draft) => {
      draft.player.gold -= amount;
    });
  }

  // Trader methods
  playerBuyTraderItem(traderId: string, itemId: string, quantity: number) {
    this.updateGameState((draft) => {
      const trader = draft.traders.find((t) => t.id === traderId);
      if (!trader) {
        return;
      }
      const buyPricePerUnit = trader.getBuyPrice(itemId);
      if (buyPricePerUnit === 0) {
        throw new Error("Item not configured for trader");
      }

      const item = trader.inventory.getItem(itemId);
      if (!item) {
        return;
      }

      const itemTemplate = items.get(itemId);
      if (!itemTemplate) {
        return;
      }

      let remainingQuanity = quantity;
      let currentQuantity = Math.min(remainingQuanity, itemTemplate.maxStack);
      while (currentQuantity > 0) {
        // should check this prior to state update
        const totalPrice = buyPricePerUnit * currentQuantity;
        if (draft.player.gold < totalPrice) {
          throw new Error("Not enough gold to buy item");
        }

        // check if there is enough space for one stack
        const firstEmptySlot = draft.player.inventory.findFirstEmptySlot(
          item.width,
          item.height
        );

        if (!firstEmptySlot) {
          return;
        }

        // remove the quantity of item from the source inventory
        trader.inventory.removeItemQuantity(itemId, currentQuantity);

        // add the new stacked item of same quantity to the target inventory
        const newItem = Item.Instantiate(itemId, {
          stackOverride: currentQuantity,
        });
        draft.player.inventory.addItem(
          newItem,
          firstEmptySlot.col,
          firstEmptySlot.row
        );

        // update player gold
        draft.player.gold -= totalPrice;

        // update the current quantity
        remainingQuanity -= currentQuantity;
        currentQuantity = Math.min(remainingQuanity, item.maxStack);
      }
    });
  }

  playerSellTraderItems(traderId: string, itemIds: string[]) {
    this.updateGameState((draft) => {
      const trader = draft.traders.find((t) => t.id === traderId);
      if (!trader) {
        return;
      }

      itemIds.forEach((itemId) => {
        const item = trader.inventory.getItem(itemId);
        if (!item) {
          return;
        }

        // remove item from player inventory
        draft.player.inventory.removeItem(itemId);
      });
    });
  }
}

const gameEngine = new GameEngine();
export default gameEngine;
