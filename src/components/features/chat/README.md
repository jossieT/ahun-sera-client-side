# ChatAssistantWidget Component

A fully-featured chat assistant widget for AhunSera with floating bubble UI, local message persistence, and AI integration.

## Features

✅ **Floating Bubble** - Bottom-right positioned chat bubble with notification badge
✅ **Expandable Window** - Smooth slide-up animation with 380x600px chat interface
✅ **Local Storage** - Persists chat history across sessions
✅ **Message Bubbles** - Distinct styling for user and AI messages
✅ **Typing Indicator** - Animated dots while AI is responding
✅ **API Integration** - POST calls to `/api/assistant/chat`
✅ **Auto-scroll** - Automatically scrolls to newest messages
✅ **Responsive** - Mobile-friendly with adaptive sizing
✅ **Clear Chat** - Option to reset conversation
✅ **Keyboard Support** - Enter to send, Shift+Enter for new line

## Usage

The widget is already integrated into the main layout and will appear on all pages:

```tsx
import ChatAssistantWidget from '@/components/features/chat/ChatAssistantWidget';

export default function Layout({ children }) {
  return (
    <div>
      {children}
      <ChatAssistantWidget />
    </div>
  );
}
```

## API Endpoint

### POST `/api/assistant/chat`

**Request Body:**

```json
{
  "message": "User's message text",
  "history": [
    {
      "id": "1",
      "role": "user",
      "content": "Previous message",
      "timestamp": "2025-12-12T17:00:00.000Z"
    }
  ]
}
```

**Response:**

```json
{
  "message": "AI assistant response",
  "timestamp": "2025-12-12T17:00:01.000Z"
}
```

## Current AI Implementation

The current implementation uses a **keyword-based response system** for demo purposes. It recognizes:

- **Booking queries** - "book", "service"
- **Pricing questions** - "price", "cost", "how much"
- **Service types** - "clean", "plumb", "electric"
- **Help requests** - "help", "support"
- **Greetings** - "hello", "hi", "hey"
- **Cancellations** - "cancel", "refund"

### Upgrading to Real AI

To integrate with OpenAI, Anthropic Claude, or other AI services:

1. Install the AI SDK:

```bash
npm install openai
# or
npm install @anthropic-ai/sdk
```

2. Update `/api/assistant/chat/route.ts`:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateAIResponse(message: string, history: any[]): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: 'You are a helpful assistant for AhunSera, a service booking platform...',
    },
    ...history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    {
      role: 'user',
      content: message,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: messages,
  });

  return completion.choices[0].message.content || 'Sorry, I could not generate a response.';
}
```

3. Add environment variable:

```env
OPENAI_API_KEY=your_api_key_here
```

## Customization

### Colors

The widget uses CSS custom properties from your theme:

- `hsl(var(--primary))` - Primary brand color
- Modify in `globals.css` or component styles

### Dimensions

```css
.chat-window {
  width: 380px;
  height: 600px;
}

.chat-bubble {
  width: 60px;
  height: 60px;
}
```

### Position

```css
.chat-widget-container {
  bottom: 24px;
  right: 24px;
}
```

### Storage Key

```typescript
const STORAGE_KEY = 'ahun-sera-chat-messages';
```

## Message Format

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
```

## Animations

- **Slide Up** - Chat window entrance
- **Fade In** - New messages
- **Typing Dots** - AI thinking indicator
- **Hover Scale** - Bubble interaction

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance

- Messages are stored in localStorage (max ~5MB)
- Only last 10 messages sent to API for context
- Auto-cleanup on clear chat
- Lazy loading of chat history

## Accessibility

- ARIA labels on buttons
- Keyboard navigation support
- Focus management
- Screen reader friendly

## Future Enhancements

- [ ] Voice input
- [ ] File attachments
- [ ] Rich text formatting
- [ ] Emoji picker
- [ ] Message reactions
- [ ] Conversation export
- [ ] Multi-language support
- [ ] Suggested quick replies
