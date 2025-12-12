import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Simulate AI response (replace with actual AI API call)
    const response = await generateAIResponse(message, history);

    return NextResponse.json({
      message: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}

// Simulated AI response generator
// Replace this with actual AI API (OpenAI, Anthropic, etc.)
async function generateAIResponse(message: string, history: any[]): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lowerMessage = message.toLowerCase();

  // Simple keyword-based responses
  if (lowerMessage.includes('book') || lowerMessage.includes('service')) {
    return 'I can help you book a service! We offer home cleaning, plumbing, electrical work, painting, and more. What type of service are you looking for?';
  }

  if (
    lowerMessage.includes('price') ||
    lowerMessage.includes('cost') ||
    lowerMessage.includes('how much')
  ) {
    return "Our pricing varies by service type and location. For accurate pricing, please visit our booking page and select your desired service. You'll get an instant quote!";
  }

  if (lowerMessage.includes('clean')) {
    return 'Our home cleaning service includes deep cleaning, regular maintenance, and we use eco-friendly products. Would you like to book a cleaning service?';
  }

  if (lowerMessage.includes('plumb')) {
    return 'We offer expert plumbing services including leak repairs, pipe installation, and emergency services. Our plumbers are licensed and experienced.';
  }

  if (lowerMessage.includes('electric')) {
    return 'Our electrical services cover wiring, fixture installation, and safety inspections. All our electricians are licensed professionals.';
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return "I'm here to help! You can ask me about:\n- Available services\n- Booking process\n- Pricing information\n- Service areas\n- Account management\n\nWhat would you like to know?";
  }

  if (
    lowerMessage.includes('hello') ||
    lowerMessage.includes('hi') ||
    lowerMessage.includes('hey')
  ) {
    return 'Hello! Welcome to AhunSera. How can I assist you today?';
  }

  if (lowerMessage.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with?";
  }

  if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
    return 'For cancellations and refunds, please visit your dashboard and go to "My Requests". You can manage your bookings there. If you need further assistance, our support team is available 24/7.';
  }

  // Default response
  return (
    'I understand you\'re asking about "' +
    message +
    '". Could you please provide more details? Or you can ask me about our services, booking process, or pricing.'
  );
}
