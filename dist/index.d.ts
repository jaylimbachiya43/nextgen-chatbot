export { default as ChatBot } from './components/ChatBot';
export { chatHandler } from './api/route';
export * from './types/chat';
export { companyKnowledge } from './data/company-knowledge';
export { KnowledgeBuilder, createCompanyKnowledge, knowledgeTemplates } from './utils/knowledge-builder';
