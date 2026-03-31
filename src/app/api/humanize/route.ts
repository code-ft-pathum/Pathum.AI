import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "nvidia/nemotron-super-49b-v1:free";
const FALLBACK_MODEL = "nvidia/nemotron-3-super-120b-a12b:free";

interface HumanizeRequest {
  text: string;
  context: string;
  level: number;
}

function buildSystemPrompt(context: string, level: number): string {
  const contextInstructions: Record<string, string> = {
    normal: "Rewrite the text to sound like a natural, everyday human conversation. Use casual phrasing, contractions, and friendly tone.",
    academic: "Rewrite the text in a scholarly, academic style. Use precise language, formal tone, and structured arguments while keeping it natural and human-written.",
    speech: "Rewrite the text as if it were spoken aloud. Use natural speech patterns, pauses indicated by punctuation, and conversational rhythm.",
    creative: "Rewrite the text with creative flair — use vivid language, metaphors, storytelling style, and expressive writing that feels genuinely human.",
    professional: "Rewrite the text in a polished, professional business tone. Clear, concise, authoritative but still warm and human.",
    casual: "Rewrite the text in a very relaxed, chatty style — like texting a friend. Short sentences, contractions, maybe even some humor.",
    technical: "Rewrite the text in a clear technical style that still sounds human — precise but approachable, avoiding robotic repetition.",
  };

  const levelInstructions: Record<number, string> = {
    1: "Make only the smallest possible changes. Keep it very close to the original.",
    2: "Make minimal changes — adjust a few phrases to sound more natural.",
    3: "Make light changes — vary sentence structure slightly and add natural flow.",
    4: "Make moderate changes — rephrase several sentences for better human feel.",
    5: "Make balanced changes — thoroughly rephrase while keeping all key information.",
    6: "Make significant changes — restructure many sentences and add natural variation.",
    7: "Make substantial changes — rewrite most content with strong human voice.",
    8: "Make heavy changes — completely rephrase with rich human expression.",
    9: "Make very heavy changes — full rewrite with deep personality and natural voice.",
    10: "Complete transformation — rewrite entirely with maximum human authenticity, personality, and natural storytelling.",
  };

  const ctxInstruction = contextInstructions[context] || contextInstructions.normal;
  const lvlInstruction = levelInstructions[level] || levelInstructions[5];

  return `You are an expert AI text humanizer called Pathum.AI. Your task is to transform AI-generated text into natural, human-sounding content.

Context Mode: ${context.charAt(0).toUpperCase() + context.slice(1)}
${ctxInstruction}

Humanization Level: ${level}/10
${lvlInstruction}

CRITICAL RULES:
- Output ONLY the humanized text. No explanations, no preambles, no "Here is the rewritten text:", just the content itself.
- Preserve the original meaning and all key information.
- Vary sentence length and structure naturally.
- Avoid AI-typical phrases like "In conclusion", "It is important to note", "Furthermore", "Moreover", etc.
- Do not repeat words or phrases unnecessarily.
- Make it feel genuinely written by a human in the chosen context.`;
}

async function callOpenRouter(messages: object[], useReasoning: boolean, model: string) {
  const body: Record<string, unknown> = {
    model,
    messages,
  };

  if (useReasoning) {
    body.reasoning = { enabled: true };
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://pathum.ai",
      "X-Title": "Pathum.AI",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter API error ${response.status}: ${err}`);
  }

  return response.json();
}

export async function POST(req: NextRequest) {
  try {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === "your_openrouter_api_key_here") {
      return NextResponse.json(
        { error: "API key not configured. Please set OPENROUTER_API_KEY in your .env.local file." },
        { status: 500 }
      );
    }

    const { text, context, level }: HumanizeRequest = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "No text provided." }, { status: 400 });
    }

    if (text.length > 10000) {
      return NextResponse.json(
        { error: "Text too long. Maximum 10,000 characters." },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(context || "normal", level || 5);

    const initialMessages = [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Please humanize the following text:\n\n${text}`,
      },
    ];

    // First API call with reasoning enabled
    let model = MODEL;
    let firstResult;
    try {
      firstResult = await callOpenRouter(initialMessages, true, model);
    } catch {
      // Try fallback model
      model = FALLBACK_MODEL;
      firstResult = await callOpenRouter(initialMessages, true, model);
    }

    const assistantMessage = firstResult.choices[0].message;

    // Build conversation with reasoning preserved
    const messages = [
      ...initialMessages,
      {
        role: "assistant",
        content: assistantMessage.content,
        reasoning_details: assistantMessage.reasoning_details ?? undefined,
      },
      {
        role: "user",
        content:
          "Review your rewrite. Make sure it sounds completely natural and human. Improve any parts that still feel AI-generated, robotic, or repetitive. Output only the final improved text.",
      },
    ];

    // Second API call — model continues from its reasoning
    const secondResult = await callOpenRouter(messages, false, model);
    const finalText = secondResult.choices[0].message.content;

    // Calculate simple stats
    const wordCount = finalText.trim().split(/\s+/).length;
    const originalWordCount = text.trim().split(/\s+/).length;

    return NextResponse.json({
      humanized: finalText,
      stats: {
        originalWords: originalWordCount,
        humanizedWords: wordCount,
        model: model,
        level,
        context,
      },
    });
  } catch (error: unknown) {
    console.error("Humanize API error:", error);
    const message = error instanceof Error ? error.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
