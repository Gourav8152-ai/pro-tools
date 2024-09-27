import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "../../lib/gemini";

export async function POST(req: NextRequest) {
  const { prompt, tool } = await req.json();

  let fullPrompt = "";
  switch (tool) {
    case "frame-mail":
      fullPrompt = `Frame a professional email based on the following requirements: ${prompt}`;
      break;
    case "sheet-formula":
      fullPrompt = `Generate a Google Sheet formula to achieve the following: ${prompt}`;
      break;
    case "reframe-sentence":
      fullPrompt = `Rewrite the following sentence with proper grammar: ${prompt}`;
      break;
    case "offer-maker":
      fullPrompt = `Create a compelling offer based on the following product or service details. Provide:
1. Offer title (maximum 72 characters)
2. Offer description (2-3 sentences)

Product/Service details: ${prompt}`;
      break;
    default:
      return NextResponse.json(
        { error: "Invalid tool specified" },
        { status: 400 },
      );
  }

  try {
    const result = await generateContent(fullPrompt);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}
