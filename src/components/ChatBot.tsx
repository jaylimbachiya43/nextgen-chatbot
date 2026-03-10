'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChatMessage, ChatBotConfig } from '../types/chat';

interface ChatBotProps extends ChatBotConfig {}

const defaultSuggestions = [
  "What services do you offer?",
  "Tell me about your company",
  "How can I contact support?",
  "What are your business hours?"
];

export default function ChatBot({ 
  apiKey, 
  companyName, 
  welcomeMessage = "Hello! I'm your virtual assistant. How can I help you today?",
  position = 'bottom-right',
  knowledge,
  apiEndpoint = '/api/chat',
  model = 'gemini-2.0-flash',
  maxTokens = 1000,
  temperature = 0.7,
  rateLimit = { maxRequestsPerMinute: 30 },
  errorHandler,
  theme = 'light',
  customStyles,
  onMessageSend,
  onMessageReceive,
  onError,
  onOpen,
  onClose,
  autoOpen = false,
  disableAnimations = false,
  locale = 'en',
  translations = {},
  storage = { enabled: true, key: 'chatbot_messages', maxMessages: 50 },
  suggestions = defaultSuggestions
}: ChatBotProps) {
  // State management
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Load from storage if enabled
    if (storage.enabled && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storage.key || 'chatbot_messages');
        if (saved) {
          const parsed = JSON.parse(saved);
          // Ensure we don't load too many messages
          return Array.isArray(parsed) ? parsed.slice(-(storage.maxMessages || 50)) : [];
        }
      } catch (e) {
        console.warn('Failed to load messages from storage:', e);
      }
    }
    return [{ role: 'assistant', content: welcomeMessage }];
  });
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastReadIndex, setLastReadIndex] = useState(-1);
  const [requestCount, setRequestCount] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestTimerRef = useRef<NodeJS.Timeout>();

  // Save messages to storage
  useEffect(() => {
    if (storage.enabled && typeof window !== 'undefined') {
      try {
        const messagesToSave = messages.slice(-(storage.maxMessages || 50));
        localStorage.setItem(storage.key || 'chatbot_messages', JSON.stringify(messagesToSave));
      } catch (e) {
        console.warn('Failed to save messages to storage:', e);
      }
    }
  }, [messages, storage.enabled, storage.key, storage.maxMessages]);
// Reset rate limit counter every minute
useEffect(() => {
  if (rateLimit?.maxRequestsPerMinute) {
    requestTimerRef.current = setInterval(() => {
      setRequestCount(0);
      setIsRateLimited(false);
    }, 60000);

    return () => {
      if (requestTimerRef.current) {
        clearInterval(requestTimerRef.current);
      }
    };
  }
  
  // Return undefined when condition is false
  return undefined;
}, [rateLimit?.maxRequestsPerMinute]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Scroll to bottom on new messages
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      if (!disableAnimations) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        messagesEndRef.current.scrollIntoView();
      }
    }
  }, [disableAnimations]);

  // Fixed useEffect with explicit return of undefined
  useEffect(() => {
    scrollToBottom();
    return undefined;
  }, [messages, scrollToBottom]);

  // Update unread count
  useEffect(() => {
    if (!isOpen && messages.length > lastReadIndex + 1) {
      setUnreadCount(messages.length - (lastReadIndex + 1));
    }
  }, [messages, isOpen, lastReadIndex]);

  // Reset unread count on open
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setLastReadIndex(messages.length - 1);
      inputRef.current?.focus();
      onOpen?.();
    }
  }, [isOpen, messages.length, onOpen]);

  // Handle message submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    // Rate limiting check
    if (rateLimit?.maxRequestsPerMinute && requestCount >= rateLimit.maxRequestsPerMinute) {
      setIsRateLimited(true);
      rateLimit.onRateLimit?.();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: translations.rateLimited || 'Rate limit exceeded. Please wait a moment before sending more messages.'
      }]);
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
    };

    // Callback
    onMessageSend?.(userMessage);

    // Update state
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setRequestCount(prev => prev + 1);

    try {
      // Prepare messages to send
      const messagesToSend = messages.length === 1 ? [userMessage] : [...messages, userMessage];

      // API call with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messagesToSend,
          apiKey,
          knowledge,
          model,
          maxTokens,
          temperature,
          systemPrompt: knowledge ? undefined : `You are the AI assistant for ${companyName}.`
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to get response');
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      onMessageReceive?.(assistantMessage);

    } catch (error: any) {
      console.error('Chat Error:', error);
      
      let errorMessage = translations.error || 'I apologize, but I encountered an error. Please try again.';
      
      if (error.name === 'AbortError') {
        errorMessage = translations.timeout || 'Request timeout. Please try again.';
      } else if (error.message.includes('API key')) {
        errorMessage = translations.invalidApiKey || 'Invalid API key. Please check your configuration.';
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessage,
        },
      ]);

      errorHandler?.(error);
      onError?.(error);
      
    } finally {
      setIsLoading(false);
    }
  }, [
    input, isLoading, requestCount, rateLimit, translations,
    onMessageSend, messages, apiEndpoint, apiKey, knowledge,
    model, maxTokens, temperature, companyName, onMessageReceive,
    errorHandler, onError
  ]);

  // Position classes
  const positionClass = useMemo(() => {
    switch (position) {
      case 'bottom-left': return 'chatbot-bottom-left';
      case 'top-right': return 'chatbot-top-right';
      case 'top-left': return 'chatbot-top-left';
      default: return 'chatbot-bottom-right';
    }
  }, [position]);

  // Theme class
  const themeClass = useMemo(() => {
    return theme === 'dark' ? 'chatbot-theme-dark' : 'chatbot-theme-light';
  }, [theme]);

  // Get localized text with locale support
  const getLocalizedText = useCallback((key: string, defaultValue: string): string => {
    // Use locale in a meaningful way
    const localizedText = translations[key];
    
    // Log locale for debugging (uses the locale prop)
    if (process.env.NODE_ENV === 'development' && locale) {
      console.debug(`Using locale: ${locale}`);
    }
    
    return localizedText || defaultValue;
  }, [translations, locale]);

  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`chatbot-fab ${positionClass} ${themeClass}`}
          aria-label={getLocalizedText('openChat', 'Open chat')}
          style={customStyles}
        >
          <span className="chatbot-fab-icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </span>
          {unreadCount > 0 && (
            <span className="chatbot-unread-badge">{unreadCount}</span>
          )}
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          ref={chatRef}
          className={`chatbot-window ${positionClass} ${themeClass}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${companyName} Chat`}
        >
          <div className="chatbot-container">
            {/* Header */}
            <div className="chatbot-header">
              <div>
                <h2 className="chatbot-title">{companyName}</h2>
                <p className="chatbot-subtitle">
                  {getLocalizedText('virtualAssistant', 'Virtual Assistant')}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="chatbot-close"
                aria-label={getLocalizedText('closeChat', 'Close chat')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chatbot-message-container chatbot-message-${message.role}`}
                >
                  <div className={`chatbot-message chatbot-${message.role}-message`}>
                    <p className="chatbot-message-text">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="chatbot-message-container assistant">
                  <div className="chatbot-loading">
                    <span className="chatbot-dot"></span>
                    <span className="chatbot-dot"></span>
                    <span className="chatbot-dot"></span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && suggestions.length > 0 && (
              <div className="chatbot-suggestions">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(suggestion);
                      inputRef.current?.focus();
                    }}
                    className="chatbot-suggestion-button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="chatbot-input-container">
              <form onSubmit={handleSubmit} className="chatbot-form">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={getLocalizedText('inputPlaceholder', 'Type your message...')}
                  className="chatbot-input"
                  disabled={isLoading || isRateLimited}
                  aria-label={getLocalizedText('messageInput', 'Message input')}
                />
                <button
                  type="submit"
                  disabled={isLoading || isRateLimited || !input.trim()}
                  className="chatbot-send"
                  aria-label={getLocalizedText('send', 'Send')}
                >
                  {getLocalizedText('send', 'Send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}