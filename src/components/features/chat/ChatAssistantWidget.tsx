'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const STORAGE_KEY = 'ahun-sera-chat-messages';

const SUGGESTED_ACTIONS = [
  { label: 'How it works?', message: 'How does AhunSera work?' },
  { label: 'Pricing', message: 'What are your service prices?' },
  { label: 'My Bookings', message: 'Can you show me my recent bookings?' },
  { label: 'Cleaning service', message: 'I need a cleaning service' },
];

export default function ChatAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const pathname = usePathname();
  const [activeBookings, setActiveBookings] = useState<
    Array<{ service_type: string; status: string }>
  >([]);

  // Load messages from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMessages(
          parsed.map((msg: Message & { timestamp: string }) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        );
      } catch (err) {
        console.error('Failed to load chat history:', err);
      }
    } else {
      // Welcome message
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `Hello${
            user?.user_metadata?.full_name ? ` ${user.user_metadata.full_name}` : ''
          }! I'm your AhunSera assistant. How can I help you today?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [user]);

  // Fetch active bookings for context
  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        const { data } = await supabase
          .from('bookings')
          .select('service_type, status')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);
        if (data) setActiveBookings(data);
      };
      fetchBookings();
    }
  }, [user]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (customMessage?: string) => {
    const textToSend = customMessage || inputValue.trim();
    if (!textToSend || isSending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
          context: {
            userName: user?.user_metadata?.full_name,
            currentPage: pathname,
            activeBookings: activeBookings.map((b) => ({ type: b.service_type, status: b.status })),
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || "I apologize, but I couldn't process that request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm your AhunSera assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      {/* Floating Bubble */}
      <div className="chat-widget-container">
        {!isOpen && (
          <button onClick={() => setIsOpen(true)} className="chat-bubble" aria-label="Open chat">
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="chat-bubble-badge">1</span>
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="chat-window">
            {/* Header */}
            <div className="chat-header">
              <div className="flex items-center gap-3 flex-1">
                <div className="chat-avatar">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">AhunSera Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-white/90">Online</p>
                  </div>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="chat-control-button"
                  title="Clear conversation"
                  aria-label="Clear conversation"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="chat-control-button"
                  title="Minimize chat"
                  aria-label="Minimize chat"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="chat-control-button chat-control-close"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'chat-message',
                    message.role === 'user' ? 'chat-message-user' : 'chat-message-assistant',
                  )}
                >
                  <div className="chat-message-bubble">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className="chat-message-time">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Suggested Actions */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-2 px-1">
                  {SUGGESTED_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleSendMessage(action.message)}
                      className="text-xs bg-white border border-gray-200 hover:border-primary hover:text-primary px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm flex items-center gap-1.5"
                    >
                      <Sparkles className="h-3 w-3" />
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="chat-message chat-message-assistant">
                  <div className="chat-message-bubble">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-container">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isSending}
                className="chat-input"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isSending}
                size="icon"
                className="chat-send-button"
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .chat-widget-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
        }

        .chat-bubble {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .chat-bubble:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .chat-bubble-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: white;
          font-size: 12px;
          font-weight: bold;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        .chat-window {
          width: 380px;
          height: 600px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-header {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .chat-control-button {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .chat-control-button:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .chat-control-button:active {
          transform: translateY(0) scale(0.95);
        }

        .chat-control-close:hover {
          background: rgba(239, 68, 68, 0.9);
          border-color: rgba(239, 68, 68, 1);
          color: white;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #f9fafb;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .chat-message {
          display: flex;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-message-user {
          justify-content: flex-end;
        }

        .chat-message-assistant {
          justify-content: flex-start;
        }

        .chat-message-bubble {
          max-width: 75%;
          padding: 10px 14px;
          border-radius: 12px;
          position: relative;
        }

        .chat-message-user .chat-message-bubble {
          background: hsl(var(--primary));
          color: black;
          border-bottom-right-radius: 4px;
        }

        .chat-message-assistant .chat-message-bubble {
          background: white;
          color: #1f2937;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .chat-message-time {
          display: block;
          font-size: 10px;
          margin-top: 4px;
          opacity: 0.7;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 4px 0;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #9ca3af;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .chat-input-container {
          padding: 16px;
          background: white;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 8px;
        }

        .chat-input {
          flex: 1;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 14px;
        }

        .chat-input:focus {
          outline: none;
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 3px hsla(var(--primary), 0.1);
        }

        .chat-send-button {
          border-radius: 8px;
          background: hsl(var(--primary));
          color: white;
          transition: all 0.2s;
        }

        .chat-send-button:hover:not(:disabled) {
          background: hsl(var(--primary));
          opacity: 0.9;
          transform: scale(1.05);
        }

        .chat-send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .chat-window {
            width: calc(100vw - 32px);
            height: calc(100vh - 100px);
            max-height: 600px;
          }

          .chat-widget-container {
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>
    </>
  );
}
