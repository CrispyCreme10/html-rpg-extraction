import { useState } from "react";
import { InventoryItem } from "../../data/inventory-items/inventory-item";

export type PurchaseSectionProps = {
  item: InventoryItem;
  buyItemCallback: (itemId: number, quantity: number) => void;
  sellItemCallback: (
    itemId: number,
    quantity: number,
    sellPrice: number
  ) => void;
};

const PurchaseSection = ({
  item,
  buyItemCallback,
  sellItemCallback,
}: PurchaseSectionProps) => {
  const [isBuyMode, setIsBuyMode] = useState(true);

  const handleClick = () => {
    if (isBuyMode) {
      buyItemCallback(item.id, 1);
    } else {
      sellItemCallback(item.id, 1, item.sellPrice);
    }
  };

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
      <div id="item" className="flex flex-col items-center">
        <img src={item.image} alt={item.name} className="w-20 h-20" />
        <h2 className="text-white">{item.name}</h2>
        <h3 className="text-white">
          Price: {isBuyMode ? item.buyPrice : item.sellPrice}
        </h3>
      </div>
      <button
        onClick={handleClick}
        className="text-white bg-blue-950 border-2 border-white/30 p-2"
      >
        {isBuyMode ? "Buy" : "Sell"}
      </button>
    </div>
  );
};
export default PurchaseSection;
