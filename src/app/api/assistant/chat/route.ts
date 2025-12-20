import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT, getContextualPrompt } from '@/lib/assistant/prompt';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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

    // Generate AI response with context
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
    // Start a chat session or just send a single prompt with context
    // For simplicity and better control over context, we combine EVERYTHING into a single prompt session if it's the first message,
    // or use the history if available.

    const contextualSystemPrompt = SYSTEM_PROMPT + '\n' + getContextualPrompt(context);

    const chat = model.startChat({
      history: history.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 500,
      },
      systemInstruction: contextualSystemPrompt,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return "I'm sorry, I'm having trouble thinking right now. Could you please try again later?";
  }
}
