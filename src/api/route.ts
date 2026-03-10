import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { ChatRequest, FlexibleKnowledge, ChatMessage } from '../types/chat';

function createSystemPrompt(companyName: string, knowledge?: FlexibleKnowledge): string {
  let context = `You are the AI assistant for ${companyName}. `;
  
  if (knowledge) {
    // Convert any knowledge structure to a readable format
    const knowledgeString = JSON.stringify(knowledge, null, 2);
    context += `You have access to the following company information:\n\n${knowledgeString}\n\n`;
  }
  
  context += `Please provide helpful, accurate responses based on this information. If you don't have information about something, politely say so. Always maintain a professional and friendly tone.`;
  
  return context;
}

function createPrompt(messages: ChatMessage[], systemPrompt: string): string {
  const conversation = messages.map(msg => 
    `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
  ).join('\n\n');
  
  return `${systemPrompt}\n\n${conversation}\n\nAssistant:`;
}

export async function chatHandler(req: Request) {
  try {
    const { 
      messages, 
      apiKey, 
      knowledge,
      model = 'gemini-2.0-flash',
      maxTokens = 1000,
      temperature = 0.7,
      systemPrompt: customSystemPrompt
    }: ChatRequest = await req.json();

    // Validation
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' }, 
        { status: 400 }
      );
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required and cannot be empty' }, 
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || !lastMessage.content) {
      return NextResponse.json(
        { error: 'Last message content is required' }, 
        { status: 400 }
      );
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const genModel = genAI.getGenerativeModel({ 
      model,
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature,
      }
    });

    // Create system prompt
    const systemPrompt = customSystemPrompt || 
      createSystemPrompt(knowledge?.company?.name || 'the company', knowledge);

    // Create full prompt with conversation
    const fullPrompt = createPrompt(messages, systemPrompt);

    // Generate response with retry logic
    let retries = 3;
    let lastError: Error | null = null;

    while (retries > 0) {
      try {
        const result = await genModel.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        // Get usage data if available
        const usage = {
          promptTokens: response.usageMetadata?.promptTokenCount || 0,
          completionTokens: response.usageMetadata?.candidatesTokenCount || 0,
          totalTokens: response.usageMetadata?.totalTokenCount || 0
        };

        return NextResponse.json({ 
          response: text.trim(),
          usage 
        });

      } catch (error: any) {
        lastError = error;
        
        // Handle rate limiting
        if (error.status === 429) {
          const waitTime = error.errorDetails?.retryDelay || 60;
          console.warn(`Rate limited. Retrying in ${waitTime}s...`);
          await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
          retries--;
          continue;
        }
        
        // Don't retry on other errors
        break;
      }
    }

    // If all retries failed
    throw lastError || new Error('Failed to generate response after retries');

  } catch (error: any) {
    console.error('Chat API Error:', error);

    // Handle different error types
    const status = error.status || 500;
    let message = 'AI failed to respond';

    if (error.status === 429) {
      message = 'Rate limit exceeded. Please try again later.';
    } else if (error.status === 401) {
      message = 'Invalid API key. Please check your Gemini API key.';
    } else if (error.status === 403) {
      message = 'Access forbidden. Please check your API permissions.';
    }

    return NextResponse.json(
      { 
        error: message,
        details: error.message,
        status: error.status 
      }, 
      { status }
    );
  }
}