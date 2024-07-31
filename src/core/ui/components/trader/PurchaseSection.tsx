import { useState } from "react";
import { InventoryItem } from "../../../data/items/item";
import BuySection from "./BuySection";
import SellSection from "./SellSection";
import { Trader } from "../../../data/traders/trader";

export type PurchaseSectionProps = {
  item: InventoryItem;
  trader: Trader;
};

const PurchaseSection = ({ item, trader }: PurchaseSectionProps) => {
  const [isBuyMode, setIsBuyMode] = useState(true);

  return (
    <div id="purchase-section" className="flex flex-col items-center">
      <div id="modes" className="flex gap-2">
        <button
          onClick={() => setIsBuyMode(true)}
          className="text-white bg-blue-950 border-2 border-white/30 p-2"
        >
          Buy
        </button>
        <button
          onClick={() => setIsBuyMode(false)}
          className="text-white bg-blue-950 border-2 border-white/30 p-2"
        >
          Sell
        </button>
      </div>
      {isBuyMode ? (
        <BuySection item={item} trader={trader} />
      ) : (
        <SellSection trader={trader} />
      )}
    </div>
  );
};
export default PurchaseSection;
