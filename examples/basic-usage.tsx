import React from 'react';
import { 
  ChatBot, 
  knowledgeTemplates,
  KnowledgeBuilder 
} from '../src';
import 'nextgen-chatbot/dist/styles/chat.css';

// Example 1: Basic usage with default knowledge
export function BasicExample() {
  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
      <h2>1. Basic Example</h2>
      <p>Simple setup with default knowledge</p>
      <ChatBot 
        apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY || "your-gemini-api-key"}
        companyName="My Company"
      />
    </div>
  );
}

// Example 2: Using ANY JSON structure (Flexible Knowledge)
export function FlexibleKnowledgeExample() {
  // You can use ANY JSON structure - no strict format required!
  const myKnowledge = {
    company: {
      name: "TechCorp",
      description: "Leading technology solutions provider",
      founded: "2020",
      location: "San Francisco, CA",
      industry: "Technology",
      mission: "To innovate and inspire",
      values: ["Innovation", "Integrity", "Customer First"]
    },
    products: [
      {
        name: "Cloud Solutions",
        description: "Enterprise cloud infrastructure",
        features: ["Scalable", "Secure", "24/7 Support"],
        benefits: ["Cost Effective", "High Performance"],
        pricing: "Contact for pricing",
        tiers: ["Basic", "Pro", "Enterprise"]
      },
      {
        name: "AI Platform",
        description: "Machine learning solutions",
        features: ["AutoML", "Predictive Analytics", "Computer Vision"],
        useCases: ["Retail", "Healthcare", "Finance"]
      }
    ],
    support: {
      email: "support@techcorp.com",
      phone: "+1-800-123-4567",
      hours: "24/7",
      liveChat: true
    },
    socialMedia: {
      twitter: "@techcorp",
      linkedin: "techcorp"
    },
    officeHours: {
      monday: "9am-6pm EST",
      tuesday: "9am-6pm EST",
      wednesday: "9am-6pm EST",
      thursday: "9am-6pm EST",
      friday: "9am-5pm EST"
    },
    holidayHours: {
      "Christmas": "Closed",
      "New Year": "10am-2pm EST"
    }
  };

  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
      <h2>2. Flexible Knowledge Example (Any JSON)</h2>
      <p>The chatbot accepts ANY JSON structure - no predefined format required!</p>
      <ChatBot 
        apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY || "your-gemini-api-key"}
        companyName="TechCorp"
        knowledge={myKnowledge}
        welcomeMessage="Hello! I'm TechCorp's AI assistant. How can I help you today?"
        theme="light"
      />
    </div>
  );
}

// Example 3: Using KnowledgeBuilder with correct methods
export function KnowledgeBuilderExample() {
  const knowledge = new KnowledgeBuilder()
    .setCompany({ 
      name: "StartupX", 
      description: "Innovative tech startup",
      founded: "2024",
      location: "Silicon Valley",
      industry: "Technology"
    })
    .addProducts([
      { 
        name: "AI Platform", 
        description: "Our revolutionary AI platform",
        features: ["Machine Learning", "API Access"],
        benefits: ["Increased Efficiency", "Cost Savings"]
      }
    ])
    .addFAQ([
      {
        question: "How do I get started?",
        answer: "Sign up for a free trial on our website!"
      },
      {
        question: "What support do you offer?",
        answer: "24/7 email support and dedicated Slack channel for enterprise customers."
      }
    ])
    .build();

  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
      <h2>3. KnowledgeBuilder Example</h2>
      <p>Build your knowledge using the builder pattern with setCompany(), addProducts(), addFAQ()</p>
      <ChatBot 
        apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY || "your-gemini-api-key"}
        companyName="StartupX"
        knowledge={knowledge}
        welcomeMessage="Welcome to StartupX! How can I help you innovate today?"
      />
    </div>
  );
}

// Example 4: Using Templates (Backward Compatibility)
export function TemplateExample() {
  const ecommerceKnowledge = knowledgeTemplates.ecommerce("MyStore");
  
  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
      <h2>4. E-commerce Template Example</h2>
      <p>Using built-in e-commerce template (for backward compatibility)</p>
      <ChatBot 
        apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY || "your-gemini-api-key"}
        companyName="MyStore"
        knowledge={ecommerceKnowledge}
        position="bottom-left"
        theme="light"
      />
    </div>
  );
}

// Example 5: Service Business with Dark Theme
export function ServiceBusinessExample() {
  const serviceKnowledge = {
    company: {
      name: "MyConsulting",
      description: "Professional business consulting services",
      founded: "2020",
      location: "New York, NY",
      industry: "Consulting"
    },
    services: [
      {
        name: "Business Strategy",
        description: "Strategic planning and execution",
        deliverables: ["Market Analysis", "Growth Strategy", "Implementation Plan"]
      },
      {
        name: "Digital Transformation",
        description: "Modernize your business processes",
        technologies: ["Cloud", "AI", "Automation"]
      }
    ],
    consultants: [
      { name: "John Doe", expertise: "Strategy", experience: "15 years" },
      { name: "Jane Smith", expertise: "Operations", experience: "12 years" }
    ],
    contact: {
      email: "consult@myconsulting.com",
      phone: "+1-888-123-4567"
    }
  };

  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
      <h2>5. Service Business with Dark Theme</h2>
      <p>Professional services company with dark theme</p>
      <ChatBot 
        apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY || "your-gemini-api-key"}
        companyName="MyConsulting"
        knowledge={serviceKnowledge}
        welcomeMessage="Hi! I'm here to help with your business needs."
        position="top-right"
        theme="dark"
      />
    </div>
  );
}

// Example 6: Advanced Configuration with All Features
export function AdvancedExample() {
  const customKnowledge = {
    company: {
      name: "Enterprise Solutions Inc.",
      description: "Enterprise-grade solutions for modern businesses",
      founded: "2018",
      location: "New York, NY",
      industry: "Enterprise Software"
    },
    products: [
      {
        name: "ERP System",
        description: "Complete enterprise resource planning",
        features: ["Inventory Management", "HR", "Finance", "CRM"],
        integrations: ["Salesforce", "SAP", "Oracle"]
      }
    ],
    support: {
      email: "enterprise@support.com",
      phone: "+1-212-555-0123",
      enterprise: true,
      sla: "99.9% uptime guarantee"
    }
  };

  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
      <h2>6. Advanced Configuration Example</h2>
      <p>Full-featured example with all available props</p>
      <ChatBot 
        apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY || "your-gemini-api-key"}
        companyName="Enterprise Solutions Inc."
        knowledge={customKnowledge}
        apiEndpoint="/api/custom-chat"
        model="gemini-2.0-flash"
        maxTokens={1500}
        temperature={0.8}
        position="bottom-right"
        theme="dark"
        autoOpen={false}
        disableAnimations={false}
        suggestions={[
          "Tell me about your ERP system",
          "What are your support hours?",
          "Do you offer custom solutions?",
          "Contact sales"
        ]}
        storage={{
          enabled: true,
          key: 'enterprise_chat_history',
          maxMessages: 100
        }}
        rateLimit={{
          maxRequestsPerMinute: 60,
          onRateLimit: () => console.log('Rate limit reached')
        }}
        onMessageSend={(msg) => console.log('Message sent:', msg)}
        onMessageReceive={(msg) => console.log('Message received:', msg)}
        onError={(error) => console.error('Chat error:', error)}
        onOpen={() => console.log('Chat opened')}
        onClose={() => console.log('Chat closed')}
        translations={{
          inputPlaceholder: "Type your message...",
          send: "Send",
          virtualAssistant: "Enterprise Assistant"
        }}
      />
    </div>
  );
}

// Example 7: Simple Flat Structure
export function FlatStructureExample() {
  // Super simple flat structure - works perfectly!
  const simpleKnowledge = {
    companyName: "FastFood Chain",
    founded: 2010,
    locations: 50,
    menu: ["Burgers", "Fries", "Shakes"],
    deals: "Happy Hour 2-4pm",
    delivery: "Free over $20",
    contact: "1-800-FAST-FOOD"
  };

  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
      <h2>7. Simple Flat Structure Example</h2>
      <p>Even flat JSON structures work perfectly!</p>
      <ChatBot 
        apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY || "your-gemini-api-key"}
        companyName="FastFood Chain"
        knowledge={simpleKnowledge}
        welcomeMessage="Welcome to FastFood Chain! What would you like to know?"
        position="bottom-right"
        theme="light"
      />
    </div>
  );
}

// Main demo component that includes all examples
export default function AllExamples() {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        NextGen Chatbot Examples
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        Open the browser console to see event callbacks in action.
        Each example demonstrates different features and knowledge structures.
      </p>
      
      <div style={{ display: 'grid', gap: '40px' }}>
        <BasicExample />
        <FlexibleKnowledgeExample />
        <KnowledgeBuilderExample />
        <TemplateExample />
        <ServiceBusinessExample />
        <FlatStructureExample />
        <AdvancedExample />
      </div>
      
      <div style={{ 
        marginTop: '60px', 
        padding: '20px', 
        background: '#f5f5f5', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3>📚 Key Takeaways</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>✅ Use ANY JSON structure - no strict format required</li>
          <li>✅ KnowledgeBuilder with setCompany(), addProducts(), addFAQ() methods</li>
          <li>✅ Built-in dark/light themes</li>
          <li>✅ Rate limiting and storage persistence</li>
          <li>✅ Full TypeScript support</li>
          <li>✅ Event callbacks for tracking</li>
        </ul>
      </div>
    </div>
  );
}