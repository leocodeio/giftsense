"use server";

import { generateGiftIdeas, GiftProfileData } from "@/lib/ai";

/**
 * Server Action to invoke the LLM from the client seamlessly without building REST endpoints.
 */
export async function performGiftGeneration(profileDetails: GiftProfileData) {
  const generatedGifts = await generateGiftIdeas(profileDetails);
  return generatedGifts;
}
