import { ChatBotConfig, CompanyKnowledge } from '../types/chat';
interface ChatBotProps extends ChatBotConfig {
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
export default function ChatBot({ apiKey, companyName, welcomeMessage, position, knowledge, apiEndpoint, model, maxTokens, temperature }: ChatBotProps): import("react/jsx-runtime").JSX.Element;
export {};
