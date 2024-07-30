import { produce, WritableDraft } from "immer";
import { Player } from "../data/players/player";
import { testPlayer, testTrader } from "../data/testing/test-data";
import { Trader } from "../data/traders/trader";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CallbackFunctionVariadic = (...args: any[]) => void;

export type GameState = {
  player: Player;
  traders: Trader[];
};

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
  playerBuyTraderItem(traderId: number, itemId: number, quantity: number) {
    this.updateGameState((draft) => {
      const trader = draft.traders.find((t) => t.id === traderId);
      if (!trader) {
        return;
      }

      const item = trader.inventory.getItem(itemId);
      if (!item) {
        return;
      }

      let remainingQuanity = quantity;
      let currentQuantity = Math.min(remainingQuanity, item.maxStack);
      while (currentQuantity > 0) {
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
        draft.player.inventory.addItem(
          item,
          firstEmptySlot.col,
          firstEmptySlot.row
        );

        // update player gold
        const totalPrice = item.buyPrice * currentQuantity;
        if (draft.player.gold < totalPrice) {
          throw new Error("Not enough gold to buy item");
        }

        draft.player.gold -= totalPrice;

        // update the current quantity
        remainingQuanity -= currentQuantity;
        currentQuantity = Math.min(remainingQuanity, item.maxStack);
      }
    });
  }
}

const gameEngine = new GameEngine();
export default gameEngine;
