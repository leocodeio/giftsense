/**
 * Common AI Provider Wrapper
 * Allows easy switching between generic LLM providers (Mistral, Gemini, OpenAI, etc).
 * Exposes a common standard interface.
 */

export interface GiftProfileData {
  giftingFor: string;
  occasion: string;
  closeness: string;
  lifeRightNow: string;
  personality: string;
  giftIntent: string;
  budget: string;
  refinementContext?: string;
}

export async function generateGiftIdeas(data: GiftProfileData) {
  // Using native fetch against the Mistral API keeps things lightweight.
  // Add MISTRAL_API_KEY to your .env file.
  
  const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
  
  const systemPrompt = `You are GiftSense, an elite AI gift recommendation engine known for incredibly thoughtful, hyper-personalized, and non-generic gift ideas.
Your goal is to deeply map the psychological profile, life state, and occasion of the recipient to suggest exactly 3 brilliant gift concepts.

CRITICAL INSTRUCTIONS FOR GIFT SELECTION:
1. NO GENERIC GIFTS: Absolutely avoid boring staples like generic gift cards, standard mugs, plain flowers, or basic chocolates unless implicitly requested by the context.
2. BE SPECIFIC & TANGIBLE: Instead of "A nice journal", suggest "A premium dotted Leuchtturm1917 journal". Instead of "A coffee maker", suggest "An aesthetically pleasing manual AeroPress Go".
3. TIE TO THE "WHY": The gift MUST directly resolve a friction point in their "Life right now" or perfectly amplify their "Personality".
4. DIVERSE CATEGORIES: The 3 options must vary in style (e.g., one experiential, one practical/utility, one sentimental/keepsake).
5. STRICT BUDGET: Adhere carefully to the requested budget bucket.

Return the response STRICTLY in valid JSON format matching this exact schema, without any markdown formatting or trailing text: 
{ 
  "profileSummary": "A short, 2-3 sentence personalized psychological profile describing the recipient's current state and exact gifting needs. Write this warmly. Quote format.",
  "signals": ["Array of exactly 3 punchy tags/traits like 'The Feeler', 'Needs Self-Care', 'Practical' etc"],
  "gifts": [
    { 
      "title": "...", 
      "description": "A vivid description of what it actually is and how it functions.", 
      "reasoning": "Exactly why this aligns with their current life stage.", 
      "priceEstimate": "Formatted tightly based on budget (e.g., '₹1,200' or '₹4,500')" 
    }
  ] 
}`;

  const userPrompt = `
Generate ideas for the following profile:
- Gifting for: ${data.giftingFor}
- Occasion: ${data.occasion}
- Closeness: ${data.closeness}
- Life right now: ${data.lifeRightNow}
- Personality: ${data.personality}
- Gift Intent: ${data.giftIntent}
- Budget: ${data.budget}
${data.refinementContext ? `- Additional constraints/refinements (YOU MUST ADHERE TO THESE): ${data.refinementContext}` : ""}
  `;

  if (!MISTRAL_API_KEY) {
    console.error("[AI Provider] CRITICAL: MISTRAL_API_KEY is missing from environment variables.");
    throw new Error("Missing MISTRAL_API_KEY inside environment context");
  }

  // Actual Mistral Invocation (Universal fetch works everywhere)
  try {
    console.log(`[AI Provider] Starting generation for gift profile`);
    console.log(`[AI Provider] Target Model: mistral-small-latest`);
    
    const startTime = Date.now();
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-small-latest", // or mistral-large-latest
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      })
    });

    const elapsed = Date.now() - startTime;
    console.log(`[AI Provider] Received response in ${elapsed}ms with status: ${response.status}`);

    if (!response.ok) {
      console.error(`[AI Provider] HTTP Error: ${response.status} - ${response.statusText}`);
      const errorBody = await response.text();
      console.error(`[AI Provider] Error Body: ${errorBody}`);
      throw new Error(`AI Provider Error: ${response.statusText}`);
    }

    const result = await response.json();
    const rawContent = result.choices[0].message.content;
    console.log(`[AI Provider] Raw LLM Output String:`, rawContent);
    return JSON.parse(rawContent);
  } catch (error) {
    console.error("[AI Provider] Fatal exception during AI Generation:", error);
    throw error;
  }
}
