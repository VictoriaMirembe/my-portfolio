import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(request) {
  try {
    const { topic } = await request.json();

    if (!topic || topic.trim() === "") {
      return NextResponse.json({ error: "No topic provided" }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Generate a quiz about "${topic}" with exactly 5 questions.
Mix between multiple choice and true/false questions.
Respond ONLY with a valid JSON array, no explanation, no markdown, no backticks.

Use this exact format:
[
  {
    "type": "multiple_choice",
    "question": "Question here?",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  },
  {
    "type": "true_false",
    "question": "Statement here.",
    "options": ["True", "False"],
    "answer": "True"
  }
]`,
        },
      ],
    });

    const raw = message.content[0].text.trim();
    const questions = JSON.parse(raw);
    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Quiz API error:", error);
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
  }
}