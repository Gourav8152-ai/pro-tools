import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '../../lib/gemini';

export async function POST(req: NextRequest) {
  const { prompt, tool } = await req.json();

  let fullPrompt = '';
  switch (tool) {
    case 'frame-mail':
      fullPrompt = `Frame a professional email based on the following requirements: ${prompt}`;
      break;
    case 'sheet-formula':
      fullPrompt = `Generate a Google Sheet formula to achieve the following: ${prompt}`;
      break;
    case 'reframe-sentence':
      fullPrompt = `Rewrite the following sentence with proper grammar: ${prompt}`;
      break;
    case 'offer-maker':
      fullPrompt = `Generate a concise, direct offer for a property listing strictly using these guidelines:

Input
* The input may come in any format or structure
* Extract key information such as:
   * Property name
   * Offer details (e.g., cashback amount, discounts)
   * Booking or move-in dates
   * Eligibility criteria (e.g., specific room types, tenancy length)
   * Deadline for the offer

Offer Title
Create a catchy title in no more than 72 characters:
1. Highlight the main benefit (e.g., cashback amount, discount percentage)
2. Include a sense of urgency if applicable
3. Use appropriate currency symbol (£, $, €, etc.) based on the offer
4. Avoid mentioning the specific property name

Offer Body
Craft a clear offer description in 3-4 sentences:
1. Start with the key offer details
2. Specify any conditions or eligibility criteria
3. Mention the property name and any standout features
4. End with a straightforward call-to-action (CTA)

Style:
* Keep the tone direct and informative
* Use clear, concise language
* Avoid flowery or overly poetic phrases
* Do not use "our/us/we" in the offer body

Remember:
* Tailor each offer to the specific property and deal
* Emphasize the value proposition and any time-sensitive elements
* Ensure the offer is clear and easy to understand at a glance

Property details: ${prompt}

Please provide the offer in the following format:
Title: [Your generated title here]

Body: [Your generated offer description here]`;
      break;
    default:
      return NextResponse.json({ error: 'Invalid tool specified' }, { status: 400 });
  }

  try {
    const result = await generateContent(fullPrompt);
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
