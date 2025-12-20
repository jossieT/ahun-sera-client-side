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

    // Format history for the new SDK
    // @google/genai typically uses a slightly different structure or allows passing it in contents
    const contents = [
      ...history.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    // Check if we need to filter history to start with 'user'
    const firstUserIndex = contents.findIndex((c) => c.role === 'user');
    const validContents = firstUserIndex !== -1 ? contents.slice(firstUserIndex) : contents;

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
