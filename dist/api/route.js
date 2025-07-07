"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatHandler = chatHandler;
// src/api/route.ts
const generative_ai_1 = require("@google/generative-ai");
const server_1 = require("next/server");
const company_knowledge_1 = require("../data/company-knowledge");
function createStructuredPrompt(userQuestion, knowledge) {
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
function chatHandler(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { messages, apiKey, knowledge = company_knowledge_1.companyKnowledge, model = 'gemini-2.0-flash', maxTokens = 1000, temperature = 0.7 } = yield req.json();
            if (!apiKey) {
                return server_1.NextResponse.json({ error: 'API key is required' }, { status: 400 });
            }
            const lastMessage = messages[messages.length - 1];
            const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
            const genModel = genAI.getGenerativeModel({
                model,
                generationConfig: {
                    maxOutputTokens: maxTokens,
                    temperature,
                }
            });
            const structuredPrompt = createStructuredPrompt(lastMessage.content, knowledge);
            const result = yield genModel.generateContent(structuredPrompt);
            const text = yield result.response.text();
            return server_1.NextResponse.json({ response: text.trim() });
        }
        catch (error) {
            console.error('Chat API Error:', error);
            return server_1.NextResponse.json({ error: 'AI failed to respond' }, { status: 500 });
        }
    });
}
