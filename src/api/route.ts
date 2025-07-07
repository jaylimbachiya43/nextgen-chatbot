// src/api/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { companyKnowledge } from '../data/company-knowledge';
import { ChatRequest, CompanyKnowledge } from '../types/chat';

function createStructuredPrompt(userQuestion: string, knowledge: CompanyKnowledge) {
  const companyContext = `
Company Information:
${JSON.stringify(knowledge.company, null, 2)}
Products/Services:
${JSON.stringify(knowledge.products, null, 2)}
FAQ:
${JSON.stringify(knowledge.faq, null, 2)}
Policies:
${JSON.stringify(knowledge.policies, null, 2)}
Contact:
${JSON.stringify(knowledge.contact, null, 2)}
`;
  return `You are the AI assistant for ${knowledge.company.name}. You have access to the following company information:

${companyContext}

Please provide helpful, accurate responses based on this information. If you don't have information about something, politely say so.

User: ${userQuestion}
Assistant:`;
}

export async function chatHandler(req: Request) {
  try {
    const { 
      messages, 
      apiKey, 
      knowledge = companyKnowledge, 
      model = 'gemini-2.0-flash',
      maxTokens = 1000,
      temperature = 0.7
    }: ChatRequest = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const genAI = new GoogleGenerativeAI(apiKey);
    const genModel = genAI.getGenerativeModel({ 
      model,
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature,
      }
    });

    const structuredPrompt = createStructuredPrompt(lastMessage.content, knowledge);

    const result = await genModel.generateContent(structuredPrompt);
    const text = await result.response.text();

    return NextResponse.json({ response: text.trim() });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'AI failed to respond' }, { status: 500 });
  }
}
