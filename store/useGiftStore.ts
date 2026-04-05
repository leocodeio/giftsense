import { create } from 'zustand';

export interface GiftStoreState {
  recipientName: string;
  recipientGender: string;
  recipientAge: string;
  occasion: string;
  closeness: string;
  lifeRightNow: string;
  personality: string;
  giftIntent: string; // From step 6
  budget: string;
  refinementContext: string;
  
  setRecipientData: (name: string, gender: string, age: string) => void;
  setField: (field: keyof Omit<GiftStoreState, 'setField' | 'setRecipientData'>, value: string) => void;
}

export const useGiftStore = create<GiftStoreState>((set) => ({
  recipientName: "Priya",
  recipientGender: "She / Her",
  recipientAge: "26 – 35",
  occasion: "Festival or celebration",
  closeness: "Extremely close",
  lifeRightNow: "Celebratory mood",
  personality: "Deeply feeling",
  giftIntent: "Anything really",
  budget: "₹500 – ₹1,500",
  refinementContext: "",

  setRecipientData: (name, gender, age) => set({ recipientName: name, recipientGender: gender, recipientAge: age }),
  setField: (field, value) => set({ [field]: value }),
}));
