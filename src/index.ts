// Main exports
export { default as ChatBot } from './components/ChatBot';
export { chatHandler } from './api/route';

// Types
export * from './types/chat';

// Default knowledge data
export { companyKnowledge } from './data/company-knowledge';

// Knowledge building utilities
export { 
  KnowledgeBuilder, 
  createCompanyKnowledge, 
  createFlexibleKnowledge,
  validateKnowledge,
  knowledgeTemplates 
} from './utils/knowledge-builder';

// Version
export const version = '1.1.0';