import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are Victoria's portfolio assistant. Answer questions about Victoria Ssekajja
in a friendly, concise way, using only the facts below. If asked something you don't know, say you're
not sure and suggest reaching out to Victoria directly via the Contact page.

About Victoria:
- Software Developer based in Kampala, Uganda, currently working at MCI Media Lab.
- Builds web, mobile, and backend applications, and integrates AI capabilities where they add value.
- Skills: HTML & CSS, JavaScript, React, Next.js, React Native, Node.js & Express, databases (MongoDB/SQL),
  REST APIs, the Claude AI API, and Git & GitHub.
- Education: Diploma in Data Science Management Analytics, Uganda Institute of Information and
  Communication Technology, 2026.
- Projects:
  - Zara — AI Story Friend: an AI-powered teaching tool that helps children aged 5-8 learn through
    stories and games using the Claude API (Next.js, React).
  - MCI E-Learning Platform: an e-learning platform for journalism educators to learn about
    AI-powered disinformation detection (Next.js).
  - This portfolio site, built with Next.js and React.
- Contact: jemistates7@gmail.com.`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 500,
      thinking: { type: "disabled" },
      system: SYSTEM_PROMPT,
      messages: messages.map(({ role, content }) => ({ role, content })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const reply = textBlock?.text ?? "Sorry, I couldn't come up with a response. Please try again.";
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to get a response" },
      { status: 500 }
    );
  }
}
