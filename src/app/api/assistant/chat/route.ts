import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT, getContextualPrompt } from '@/lib/assistant/prompt';

// Initialize the new Google Gen AI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history, context } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set');
    }

    // Generate AI response with context using the new SDK
    const response = await generateAIResponse(message, history || [], context || {});

    return NextResponse.json({
      message: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatContext {
  userName?: string;
  currentPage?: string;
  activeBookings?: Array<{
    type: string;
    status: string;
  }>;
}

async function generateAIResponse(
  message: string,
  history: Message[],
  context: ChatContext,
): Promise<string> {
  try {
    const contextualSystemPrompt = SYSTEM_PROMPT + '\n' + getContextualPrompt(context);

    // 1. Combine history and current message
    const allMessages = [...history, { role: 'user', content: message }];

    // 2. Filter history:
    // - Must start with 'user'
    // - Must alternate User -> Assistant -> User ...
    // - Skip empty content
    const validContents: any[] = [];
    let lastRole: string | null = null;

    for (const msg of allMessages) {
      if (!msg.content || msg.content.trim() === '') continue;

      const role = msg.role === 'user' ? 'user' : 'model';

      // Ensure we start with 'user'
      if (validContents.length === 0 && role !== 'user') continue;

      // Ensure alternating roles (merge or skip if same role consecutively)
      if (role === lastRole) {
        // Option A: Append to last message parts (Gemini supports multiple parts)
        validContents[validContents.length - 1].parts.push({ text: msg.content });
      } else {
        validContents.push({
          role: role,
          parts: [{ text: msg.content }],
        });
        lastRole = role;
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: validContents,
      config: {
        systemInstruction: contextualSystemPrompt,
        maxOutputTokens: 1000,
      } as { systemInstruction?: string; maxOutputTokens?: number },
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error: unknown) {
    console.error('Gemini API error:', error);

    // Check for rate limit error
    const isRateLimit =
      (error &&
        typeof error === 'object' &&
        'status' in error &&
        (error as { status: number }).status === 429) ||
      (error instanceof Error && error.message?.includes('429'));

    if (isRateLimit) {
      return "I'm receiving too many requests right now. Please wait a few seconds and try again. (Gemini Rate Limit)";
    }

    return "I'm sorry, I'm having trouble thinking right now. Could you please try again later?";
  }
}
