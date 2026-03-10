// Base types
export type Role = 'user' | 'assistant';

export interface ChatMessage {
  role: Role;
  content: string;
}

export interface ChatResponse {
  response: string;
  error?: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

// Company Knowledge Types (for backward compatibility)
export interface CompanyInfo {
  name: string;
  description: string;
  founded: string;
  location: string;
  industry: string;
}

export interface Product {
  name: string;
  description: string;
  features?: string[];
  technologies?: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    cloud?: string[];
    devOps?: string[];
  };
  developmentProcess?: string[];
  benefits?: string[];
  whyChooseUs?: string[];
  platforms?: Array<{
    name: string;
    features: string[];
  }>;
  expertise?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Policies {
  refund: string;
  privacy: string;
  terms: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  support: {
    email: string;
    phone: string;
  };
}

export interface CompanyKnowledge {
  company: CompanyInfo;
  products: Product[];
  faq: FAQ[];
  policies: Policies;
  contact: ContactInfo;
}

// Flexible knowledge structure - user can provide ANY JSON
export interface FlexibleKnowledge {
  [key: string]: any;
}

export interface ChatBotConfig {
  // Required
  apiKey: string;
  companyName: string;
  
  // Optional with defaults
  welcomeMessage?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  knowledge?: FlexibleKnowledge | CompanyKnowledge; // Accept both types
  apiEndpoint?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  
  // New production features
  rateLimit?: {
    maxRequestsPerMinute?: number;
    onRateLimit?: () => void;
  };
  errorHandler?: (error: Error) => void;
  theme?: 'light' | 'dark' | 'custom';
  customStyles?: Record<string, string>;
  onMessageSend?: (message: ChatMessage) => void;
  onMessageReceive?: (message: ChatMessage) => void;
  onError?: (error: Error) => void;
  onOpen?: () => void;
  onClose?: () => void;
  autoOpen?: boolean;
  disableAnimations?: boolean;
  locale?: string;
  translations?: Record<string, string>;
  storage?: {
    enabled: boolean;
    key?: string;
    maxMessages?: number;
  };
  suggestions?: string[];
}

export interface ChatRequest {
  messages: ChatMessage[];
  apiKey: string;
  knowledge?: FlexibleKnowledge | CompanyKnowledge;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

export interface ChatApiResponse {
  response: string;
  error?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}