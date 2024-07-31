import { useState } from "react";
import { InventoryItem } from "../../../data/items/item";
import { Trader } from "../../../data/traders/trader";
import { useGameStore } from "../../../engine/zustand";

export type BuySectionProps = {
  item: InventoryItem;
  trader: Trader;
};

const MIN_BUY_QUANTITY = 1;

const BuySection = ({ item, trader }: BuySectionProps) => {
  const playerBuyTraderItem = useGameStore(
    (state) => state.playerBuyTraderItem
  );
  const [quantity, setQuantity] = useState(1);

  const handleBuyClick = () => {
    playerBuyTraderItem(trader.id, item.id, quantity);
    setQuantity(MIN_BUY_QUANTITY);
  };

  const itemMinStackValue = Math.min(item.maxStack, item.stack);

  console.log("BuySection", item, trader);

  return (
    <div id="buy-section">
      <div id="item" className="flex flex-col items-center">
        <img src={item.image} alt={item.name} className="w-20 h-20" />
        <h2 className="text-white">{item.name}</h2>
        <h3 className="text-white">
          Price: {trader.getBuyPrice(item.name) * quantity}
        </h3>
        <input
          type="number"
          value={quantity}
          min={MIN_BUY_QUANTITY}
          max={itemMinStackValue}
          onChange={(e) => {
            let value = +e.target.value;
            if (value < MIN_BUY_QUANTITY) {
              value = MIN_BUY_QUANTITY;
            } else if (value > item.maxStack) {
              value = item.maxStack;
            }

            setQuantity(value);
          }}
        />
      </div>
      <button
        onClick={() => setQuantity(MIN_BUY_QUANTITY)}
        className="text-white bg-blue-950 border-2 border-white/30 p-2"
      >
        Min
      </button>
      <button
        onClick={() => setQuantity(itemMinStackValue)}
        className="text-white bg-blue-950 border-2 border-white/30 p-2"
      >
        Max
      </button>
      <button
        onClick={handleBuyClick}
        className="text-white bg-blue-950 border-2 border-white/30 p-2"
      >
        Buy
      </button>
    </div>
  );
};
export default BuySection;
