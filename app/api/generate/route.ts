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
      fullPrompt = `Generate a captivating offer for a property listing using the following guidelines:

Offer Title
Create a witty and eye-catching title in no more than 72 characters:
1. Use action words or puns to grab attention
2. Highlight a key benefit or savings amount
3. Avoid specific property names or room types
4. Create a sense of urgency or exclusivity

Offer Body
Craft a compelling offer description in 3-4 sentences:
1. Start with an engaging hook about the property or offer
2. Include all provided details (e.g., rent amount, rebates, dates)
3. Highlight unique selling points or amenities
4. End with a strong call-to-action (CTA)

Style:
* Keep the tone witty, direct, and conversational
* Use vivid language to paint a picture of the living experience
* Balance professionalism with a touch of playfulness

Remember:
* Each generated offer should be unique and tailored to the specific property
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
