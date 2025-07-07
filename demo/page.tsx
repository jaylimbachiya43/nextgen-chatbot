'use client';

import React from 'react';
import { ChatBot, createCompanyKnowledge, knowledgeTemplates } from '../src';

export default function DemoPage() {
  // Example custom knowledge
  const customKnowledge = createCompanyKnowledge(
    {
      name: "Demo Company",
      description: "A demonstration company showcasing the chatbot capabilities",
      founded: "2024",
      location: "Demo City",
      industry: "Technology"
    },
    {
      products: [
        {
          name: "AI Solutions",
          description: "Cutting-edge artificial intelligence solutions for businesses",
          features: ["Machine Learning", "Natural Language Processing", "Computer Vision"],
          benefits: ["Increased Efficiency", "Cost Savings", "Better Decision Making"]
        },
        {
          name: "Cloud Services",
          description: "Scalable cloud infrastructure and hosting solutions",
          features: ["Auto-scaling", "High Availability", "24/7 Support"],
          benefits: ["Reliability", "Performance", "Security"]
        }
      ],
      faq: [
        {
          question: "What services do you offer?",
          answer: "We offer AI solutions and cloud services to help businesses grow and innovate."
        },
        {
          question: "How can I get started?",
          answer: "Contact us for a free consultation to discuss your needs and how we can help."
        },
        {
          question: "What makes you different?",
          answer: "We combine cutting-edge AI technology with personalized service to deliver exceptional results."
        }
      ]
    }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            NextGen Chatbot Demo
          </h1>
          <p className="text-xl text-gray-600">
            Experience the power of AI-powered customer support
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              About Demo Company
            </h2>
            <p className="text-gray-600 mb-4">
              We are a technology company specializing in AI solutions and cloud services. 
              Our mission is to help businesses leverage the power of artificial intelligence 
              to grow and succeed in the digital age.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium text-gray-700">Founded:</span>
                <span className="ml-2 text-gray-600">2024</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700">Location:</span>
                <span className="ml-2 text-gray-600">Demo City</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700">Industry:</span>
                <span className="ml-2 text-gray-600">Technology</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Our Services
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">AI Solutions</h3>
                <p className="text-gray-600 text-sm">
                  Machine Learning, Natural Language Processing, Computer Vision
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Cloud Services</h3>
                <p className="text-gray-600 text-sm">
                  Auto-scaling, High Availability, 24/7 Support
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Try Our AI Assistant
          </h2>
          <p className="text-gray-600 mb-4">
            Click the chat button in the bottom right corner to start a conversation with our AI assistant. 
            You can ask about our services, company information, or any other questions you might have.
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Example Questions:</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• "What services do you offer?"</li>
              <li>• "Tell me about your company"</li>
              <li>• "How can I get started?"</li>
              <li>• "What makes you different from competitors?"</li>
            </ul>
          </div>
        </div>

        {/* Chatbot Component */}
        <ChatBot 
          apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY || "demo-key"}
          companyName="Demo Company"
          knowledge={customKnowledge}
          welcomeMessage="Hello! I'm Demo Company's AI assistant. How can I help you today?"
          position="bottom-right"
        />
      </div>
    </div>
  );
} 