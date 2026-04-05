"use server";

import { generateGiftIdeas, GiftProfileData } from "@/lib/ai";

/**
 * Server Action to invoke the LLM from the client seamlessly without building REST endpoints.
 */
export async function performGiftGeneration() {
  // We will bind this to your actual state (Context API/Zustand) later!
  // Right now, this pushes the exact data from the UI mockup to trigger your REAL Mistral API key.
  const profileDetails: GiftProfileData = {
    giftingFor: "Priya · She/Her · 26–35",
    occasion: "Festival or celebration",
    closeness: "Extremely close",
    lifeRightNow: "Celebratory mood",
    personality: "Deeply feeling",
    budget: "₹500 – ₹1,500"
  };

  const generatedGifts = await generateGiftIdeas(profileDetails);
  return generatedGifts;
}
