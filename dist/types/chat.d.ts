export type Role = 'user' | 'assistant';
export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}
export interface ChatResponse {
    response: string;
    error?: string;
}
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
export interface ChatBotConfig {
    apiKey: string;
    companyName: string;
    welcomeMessage?: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    knowledge?: CompanyKnowledge;
    apiEndpoint?: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
}
export interface ChatRequest {
    messages: ChatMessage[];
    apiKey: string;
    knowledge?: CompanyKnowledge;
    model?: string;
    maxTokens?: number;
    temperature?: number;
}
export interface ChatApiResponse {
    response: string;
    error?: string;
}
