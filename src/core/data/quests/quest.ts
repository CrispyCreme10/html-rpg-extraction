import { InventoryItem } from "../inventory-items/inventory-item";

export class Quest {
  private traderId: number; // the trader that gives the quest
  private name: string;
  private description: string;
  private rewards: QuestReward;

  constructor(
    traderId: number,
    name: string,
    description: string,
    rewards: QuestReward
  ) {
    this.traderId = traderId;
    this.name = name;
    this.description = description;
    this.rewards = rewards;
  }

  getTraderId(): number {
    return this.traderId;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getRewards(): QuestReward {
    return this.rewards;
  }
}

export class QuestReward {
  private gold: number = 0;
  private experience: number = 0;
  private items: InventoryItem[] = [];
  private traderRep: TraderRepChange; // can be positive or negative

  constructor(
    gold: number,
    experience: number,
    items: InventoryItem[],
    traderRep: TraderRepChange
  ) {
    this.gold = gold;
    this.experience = experience;
    this.items = items;
    this.traderRep = traderRep;
  }

  getGold(): number {
    return this.gold;
  }

  getExperience(): number {
    return this.experience;
  }

  getItems(): InventoryItem[] {
    return this.items;
  }

  getTraderRepChange(): TraderRepChange {
    return this.traderRep;
  }
}

export type TraderRepChange = {
  traderId: number;
  amount: number;
};
