import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic();

// Helper: check if input is a URL
function isUrl(text) {
  try {
    new URL(text.trim());
    return true;
  } catch {
    return false;
  }
}

// Helper: fetch article text from a URL
async function fetchArticleFromUrl(url) {
  const response = await fetch(url);
  const html = await response.text();

  // Strip HTML tags to get plain text
  const plainText = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.slice(0, 8000); // Limit to avoid token overflow
}

export async function POST(request) {
  try {
    const { articleText } = await request.json();

    if (!articleText || articleText.trim() === "") {
      return NextResponse.json(
        { error: "No article text provided" },
        { status: 400 }
      );
    }

    let textToSummarise = articleText;

    // If user pasted a URL, fetch its content
    if (isUrl(articleText.trim())) {
      try {
        textToSummarise = await fetchArticleFromUrl(articleText.trim());
      } catch (err) {
        return NextResponse.json(
          { error: "Could not fetch article from that URL. Try pasting the text directly." },
          { status: 400 }
        );
      }
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Please summarise the following article clearly and concisely.
          Include:
          - A one-sentence TL;DR
          - 3-5 key points
          - The main conclusion

          Article:
          ${textToSummarise}`,
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