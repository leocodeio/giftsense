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
  budget: string;
}

export async function generateGiftIdeas(data: GiftProfileData) {
  // Using native fetch against the Mistral API keeps things lightweight.
  // Add MISTRAL_API_KEY to your .env file.
  
  const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
  
  const systemPrompt = `You are GiftSense, an expert AI gift recommendation engine. 
Based on the provided demographic, occasion, and psychological profile of the recipient, construct a holistic persona and suggest exactly 3 highly thoughtful, unique gift ideas.
Return the response STRICTLY in valid JSON format matching this exact schema: 
{ 
  "profileSummary": "A short, 2-3 sentence personalized psychological profile describing the recipient's current state and exact gifting needs. Write this warmly. Quote format.",
  "signals": ["Array of 3 tags/traits like 'The Feeler', 'Sentimental', 'Practical' etc"],
  "gifts": [{ "title": "...", "description": "...", "reasoning": "...", "priceEstimate": "..." }] 
}`;

  const userPrompt = `
Generate ideas for the following profile:
- Gifting for: ${data.giftingFor}
- Occasion: ${data.occasion}
- Closeness: ${data.closeness}
- Life right now: ${data.lifeRightNow}
- Personality: ${data.personality}
- Budget: ${data.budget}
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
