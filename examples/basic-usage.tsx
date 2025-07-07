import React from 'react';
import { ChatBot, createCompanyKnowledge, knowledgeTemplates } from '../src';
import '../src/styles/chat.css';

// Example 1: Basic usage with default knowledge
export function BasicExample() {
  return (
    <ChatBot 
      apiKey="your-gemini-api-key"
      companyName="My Company"
    />
  );
}

// Example 2: Custom knowledge
export function CustomKnowledgeExample() {
  const myKnowledge = createCompanyKnowledge(
    {
      name: "TechCorp",
      description: "Leading technology solutions provider",
      founded: "2020",
      location: "San Francisco, CA",
      industry: "Technology"
    },
    {
      products: [
        {
          name: "Cloud Solutions",
          description: "Enterprise cloud infrastructure and management",
          features: ["Scalable", "Secure", "24/7 Support"],
          benefits: ["Cost Effective", "High Performance", "Easy Management"]
        }
      ],
      faq: [
        {
          question: "What services do you offer?",
          answer: "We provide comprehensive cloud solutions including infrastructure, security, and support."
        }
      ]
    }
  );

  return (
    <ChatBot 
      apiKey="your-gemini-api-key"
      companyName="TechCorp"
      knowledge={myKnowledge}
      welcomeMessage="Hello! I'm TechCorp's AI assistant. How can I help you today?"
    />
  );
}

// Example 3: Using templates
export function TemplateExample() {
  const ecommerceKnowledge = knowledgeTemplates.ecommerce("MyStore");
  
  return (
    <ChatBot 
      apiKey="your-gemini-api-key"
      companyName="MyStore"
      knowledge={ecommerceKnowledge}
      position="bottom-left"
    />
  );
}

// Example 4: Service business
export function ServiceBusinessExample() {
  const serviceKnowledge = knowledgeTemplates.service(
    "MyConsulting", 
    "We provide business consulting and strategy services"
  );

  return (
    <ChatBot 
      apiKey="your-gemini-api-key"
      companyName="MyConsulting"
      knowledge={serviceKnowledge}
      welcomeMessage="Hi! I'm here to help with your business needs."
      position="top-right"
    />
  );
}

// Example 5: Advanced configuration
export function AdvancedExample() {
  const customKnowledge = createCompanyKnowledge(
    {
      name: "My Startup",
      description: "Innovative tech startup",
      founded: "2024",
      location: "Silicon Valley",
      industry: "Technology"
    },
    {
      products: [
        {
          name: "AI Platform",
          description: "Our revolutionary AI platform",
          features: ["Machine Learning", "Real-time Processing", "API Access"],
          benefits: ["Increased Efficiency", "Cost Savings", "Scalability"]
        }
      ],
      faq: [
        {
          question: "What makes your AI platform unique?",
          answer: "Our platform combines cutting-edge ML with intuitive design."
        }
      ]
    }
  );

  return (
    <ChatBot 
      apiKey="your-gemini-api-key"
      companyName="My Startup"
      knowledge={customKnowledge}
      apiEndpoint="/api/custom-chat"
      model="gemini-2.0-flash"
      maxTokens={1500}
      temperature={0.8}
      position="bottom-right"
    />
  );
} 