import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic(); // Uses ANTHROPIC_API_KEY from .env automatically

export async function POST(request) {
  try {
    const { articleText } = await request.json();

    if (!articleText || articleText.trim() === "") {
      return NextResponse.json(
        { error: "No article text provided" },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Please summarise the following article in a clear and concise way. 
          Include:
          - A one-sentence TL;DR
          - 3-5 key points
          - The main conclusion
          - donot display in markdown format

          Article:
          ${articleText}`,
        },
      ],
    });

    const summary = message.content[0].text;
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summarise API error:", error);
    return NextResponse.json(
      { error: "Failed to summarise article" },
      { status: 500 }
    );
  }
}