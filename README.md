# NextGen Chatbot

<div align="center">

[![npm version](https://img.shields.io/npm/v/nextgen-chatbot.svg)](https://www.npmjs.com/package/nextgen-chatbot)
[![npm downloads](https://img.shields.io/npm/dm/nextgen-chatbot.svg)](https://www.npmjs.com/package/nextgen-chatbot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13+-black.svg)](https://nextjs.org/)

**A production-ready, customizable chatbot component for Next.js applications with Google's Gemini AI integration.**

[Demo](https://your-demo-link.com) • [Documentation](#documentation) • [Examples](#examples) • [Report Bug](https://github.com/yourusername/nextgen-chatbot/issues)

</div>

---

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Common Issues & Solutions](#common-issues--solutions)
- [Advanced Configuration](#advanced-configuration)
- [Knowledge Base](#knowledge-base)
- [Styling & Customization](#styling--customization)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🚀 **Easy Integration** | Drop-in component for any Next.js app (App Router & Pages Router) |
| 🎨 **Fully Customizable** | Style it to match your brand with CSS variables |
| 📦 **Flexible Knowledge** | Use ANY JSON structure for company knowledge - no strict format required |
| 🌙 **Dark Mode Support** | Built-in light/dark themes with automatic switching |
| ⚡ **Rate Limiting** | Built-in rate limit protection to prevent API abuse |
| 💾 **Message Persistence** | Optional local storage for conversation history |
| 📱 **Mobile Responsive** | Works perfectly on all devices with responsive design |
| ♿ **Accessible** | ARIA labels, keyboard navigation, and screen reader support |
| 🔧 **TypeScript Ready** | Full type definitions included |
| 🤖 **AI-Powered** | Built on Google's Gemini AI for intelligent responses |
| 🎯 **Positioning** | Choose from 4 different corner positions |
| 🔒 **Secure** | API keys are handled securely on the client side |
| 📊 **Usage Tracking** | Monitor token usage and API calls |

---

## 📦 Installation

```bash
npm install nextgen-chatbot
# or
yarn add nextgen-chatbot
# or
pnpm add nextgen-chatbot
🚀 Quick Start
⚠️ CRITICAL: API Route Setup
The chatbot requires an API route to work. If you skip this step, you'll get the dreaded "Unexpected token '<'" error!

Step 1: Create the API Route
For Next.js App Router (app/api/chat/route.ts):

typescript
import { chatHandler } from 'nextgen-chatbot';

export async function POST(request: Request) {
  return chatHandler(request);
}
For Next.js Pages Router (pages/api/chat.ts):

typescript
import { chatHandler } from 'nextgen-chatbot';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await chatHandler(req as any);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error('API Route Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
Step 2: Add the ChatBot to Your Page
tsx
'use client';

import { ChatBot } from 'nextgen-chatbot';
import 'nextgen-chatbot/dist/styles/chat.css';

export default function MyPage() {
  return (
    <div>
      <h1>Welcome to my website</h1>
      <ChatBot 
        apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY!}
        companyName="My Company"
      />
    </div>
  );
}
Step 3: Get Your Gemini API Key
Go to Google AI Studio

Create a new API key

Add it to your .env.local file:

env
NEXT_PUBLIC_GEMINI_API_KEY=your-actual-gemini-api-key-here
Step 4: Run Your App
bash
npm run dev
❗ Common Issues & Solutions
Issue 1: "Unexpected token '<'" Error
Problem: The chatbot tries to call /api/chat but gets an HTML 404 page instead of JSON.

Solution: You forgot to create the API route! Follow Step 1 in Quick Start above.

Quick Fix:

bash
# Create the API route file
mkdir -p app/api/chat
touch app/api/chat/route.ts
Then add the code from Step 1 and restart your dev server.

Issue 2: "Cannot find module 'next/server'" or TypeScript Errors
Problem: TypeScript can't find Next.js types when building the package.

Solution: Make sure you have Next.js installed as a dev dependency:

bash
npm install -D next @types/node @types/react
Issue 3: CSS Not Loading
Problem: The chatbot appears but has no styling.

Solution: Import the CSS file correctly:

tsx
// In your root layout or page
import 'nextgen-chatbot/dist/styles/chat.css';

// Or use the minified version
import 'nextgen-chatbot/dist/styles/chat.min.css';
Issue 4: API Key Error (401)
Problem: "Invalid API key" or "API key is required" error.

Solution:

Verify your API key in Google AI Studio

Make sure the key is correctly set in .env.local

Check that you're using NEXT_PUBLIC_ prefix for client-side access

Issue 5: Rate Limit Error (429)
Problem: "Rate limit exceeded" or quota errors.

Solution:

Wait a minute and try again

Check your Gemini API quota in Google Cloud Console

Implement rate limiting in your component:

tsx
<ChatBot 
  apiKey="your-key"
  companyName="My Company"
  rateLimit={{
    maxRequestsPerMinute: 30,
    onRateLimit: () => alert('Please wait a moment...')
  }}
/>
Issue 6: CORS Errors
Problem: Browser blocks requests due to CORS.

Solution: Add CORS headers to your API route:

typescript
// app/api/chat/route.ts
import { chatHandler } from 'nextgen-chatbot';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const response = await chatHandler(request);
  
  // Add CORS headers
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
Issue 7: Knowledge Not Working
Problem: The AI doesn't use your company information correctly.

Solution: You can use ANY JSON structure - no strict format required:

tsx
// ANY JSON structure works!
const myKnowledge = {
  companyName: "TechCorp",
  founded: 2020,
  products: [
    { name: "AI Platform", price: "$999" }
  ],
  supportEmail: "help@techcorp.com",
  holidayHours: {
    "Christmas": "Closed",
    "New Year": "10am-2pm"
  },
  // Add whatever you want!
  customField: "any value"
};

<ChatBot 
  apiKey="your-key"
  companyName="TechCorp"
  knowledge={myKnowledge}
/>
⚙️ Advanced Configuration
Complete Props Reference
tsx
<ChatBot 
  // Required
  apiKey="your-gemini-api-key"
  companyName="My Company"
  
  // Optional - UI Customization
  welcomeMessage="Hello! How can I help you today?"
  position="bottom-right" // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  theme="light" // 'light' | 'dark' | 'custom'
  customStyles={{ '--chatbot-primary': '#ff0000' }}
  disableAnimations={false}
  
  // Optional - Knowledge & AI
  knowledge={yourKnowledgeObject} // Any JSON structure
  model="gemini-2.0-flash"
  maxTokens={1000}
  temperature={0.7}
  apiEndpoint="/api/chat"
  systemPrompt="You are a helpful assistant..."
  
  // Optional - Features
  suggestions={[
    "What services do you offer?",
    "Contact support",
    "Business hours"
  ]}
  autoOpen={false}
  
  // Optional - Storage
  storage={{
    enabled: true,
    key: 'chat_history',
    maxMessages: 50
  }}
  
  // Optional - Rate Limiting
  rateLimit={{
    maxRequestsPerMinute: 30,
    onRateLimit: () => console.log('Rate limited')
  }}
  
  // Optional - Event Callbacks
  onMessageSend={(msg) => console.log('Sent:', msg)}
  onMessageReceive={(msg) => console.log('Received:', msg)}
  onError={(error) => console.error('Error:', error)}
  onOpen={() => console.log('Chat opened')}
  onClose={() => console.log('Chat closed')}
  
  // Optional - Localization
  locale="es"
  translations={{
    inputPlaceholder: "Escribe tu mensaje...",
    send: "Enviar",
    virtualAssistant: "Asistente Virtual",
    rateLimited: "Demasiadas solicitudes. Espera un momento.",
    error: "Error. Intenta de nuevo.",
    timeout: "Tiempo de espera agotado."
  }}
/>
📚 Knowledge Base
Using Any JSON Structure
The chatbot accepts ANY JSON structure - no predefined format required!

tsx
// Example 1: Simple structure
const simpleKnowledge = {
  company: "TechCorp",
  founded: 2020,
  services: ["AI", "Cloud", "Consulting"]
};

// Example 2: Nested structure
const detailedKnowledge = {
  company: {
    name: "TechCorp",
    details: {
      founded: 2020,
      employees: 50,
      location: "San Francisco"
    }
  },
  products: [
    {
      name: "AI Platform",
      pricing: {
        basic: "$999/month",
        enterprise: "Custom"
      },
      features: ["ML", "Analytics"]
    }
  ],
  support: {
    email: "support@techcorp.com",
    hours: "24/7",
    holidays: ["Christmas", "New Year"]
  }
};

// Example 3: Flat structure
const flatKnowledge = {
  companyName: "TechCorp",
  foundedYear: 2020,
  mainProduct: "AI Platform",
  supportEmail: "help@techcorp.com",
  phoneNumber: "+1-800-123-4567"
};

<ChatBot 
  apiKey="your-key"
  companyName="TechCorp"
  knowledge={simpleKnowledge} // Any of the above works!
/>
Using KnowledgeBuilder (Optional)
For those who prefer a builder pattern:

tsx
import { KnowledgeBuilder } from 'nextgen-chatbot';

const knowledge = new KnowledgeBuilder()
  .add('company', { name: "TechCorp", founded: 2020 })
  .add('products', [{ name: "AI Platform", price: "$999" }])
  .add('support', { email: "support@techcorp.com" })
  .add('customField', 'any value')
  .build();
Using Templates (Backward Compatibility)
tsx
import { knowledgeTemplates } from 'nextgen-chatbot';

// E-commerce template
const ecommerceKnowledge = knowledgeTemplates.ecommerce("MyStore");

// Service business template
const serviceKnowledge = knowledgeTemplates.service(
  "MyConsulting", 
  "We provide business consulting services"
);

// Simple template
const simpleKnowledge = knowledgeTemplates.simple(
  "MyCompany", 
  "We do amazing things"
);
🎨 Styling & Customization
CSS Variables Reference
Override these variables in your global CSS:

css
:root {
  /* Colors */
  --chatbot-primary: #2563eb;        /* Primary brand color */
  --chatbot-primary-dark: #1d4ed8;    /* Darker shade for hover */
  --chatbot-primary-light: #3b82f6;   /* Lighter shade for focus */
  --chatbot-accent: #4f46e5;          /* Accent color */
  
  /* Backgrounds */
  --chatbot-bg: #ffffff;               /* Main background */
  --chatbot-bg-secondary: #f9fafb;     /* Secondary background */
  --chatbot-user-bg: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  --chatbot-assistant-bg: #ffffff;
  
  /* Text */
  --chatbot-text: #1f2937;             /* Primary text */
  --chatbot-text-secondary: #6b7280;   /* Secondary text */
  
  /* Borders */
  --chatbot-border: #e5e7eb;           /* Border color */
  --chatbot-assistant-border: #e5e7eb;
  
  /* Typography */
  --chatbot-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --chatbot-font-size-base: 16px;
  --chatbot-font-size-sm: 14px;
  --chatbot-font-size-lg: 18px;
  
  /* Spacing */
  --chatbot-spacing-xs: 4px;
  --chatbot-spacing-sm: 8px;
  --chatbot-spacing-md: 16px;
  --chatbot-spacing-lg: 24px;
  
  /* Border Radius */
  --chatbot-radius-sm: 8px;
  --chatbot-radius-md: 12px;
  --chatbot-radius-lg: 16px;
  --chatbot-radius-full: 9999px;
  
  /* Shadows */
  --chatbot-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  
  /* Animations */
  --chatbot-transition-fast: 150ms;
  --chatbot-transition-normal: 250ms;
}
Dark Theme
tsx
<ChatBot 
  apiKey="your-key"
  companyName="My Company"
  theme="dark" // Built-in dark theme
/>
Custom Dark Theme
css
/* Custom dark theme */
.chatbot-theme-dark {
  --chatbot-primary: #3b82f6;
  --chatbot-bg: #1f2937;
  --chatbot-bg-secondary: #111827;
  --chatbot-text: #f9fafb;
  --chatbot-text-secondary: #9ca3af;
  --chatbot-border: #374151;
  --chatbot-assistant-bg: #374151;
}
📝 Examples
Basic Example
tsx
import { ChatBot } from 'nextgen-chatbot';
import 'nextgen-chatbot/dist/styles/chat.css';

export default function Home() {
  return (
    <ChatBot 
      apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY!}
      companyName="My Company"
    />
  );
}
E-commerce Store
tsx
import { ChatBot } from 'nextgen-chatbot';

const storeKnowledge = {
  store: {
    name: "Fashion Store",
    type: "Clothing Retail",
    established: 2020
  },
  categories: ["Men", "Women", "Kids"],
  shipping: {
    free: "Orders over $50",
    standard: "$5.99",
    express: "$12.99"
  },
  returnPolicy: "30-day returns",
  faq: [
    {
      question: "How do I track my order?",
      answer: "You'll receive tracking info via email"
    }
  ]
};

export default function Store() {
  return (
    <ChatBot 
      apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY!}
      companyName="Fashion Store"
      knowledge={storeKnowledge}
      suggestions={[
        "Track my order",
        "Return policy",
        "Shipping options",
        "Size guide"
      ]}
    />
  );
}
SaaS Application
tsx
import { ChatBot, KnowledgeBuilder } from 'nextgen-chatbot';

const saasKnowledge = new KnowledgeBuilder()
  .add('product', {
    name: "Analytics Pro",
    features: ["Dashboard", "Reports", "API Access"],
    pricing: {
      starter: "$29/month",
      pro: "$99/month",
      enterprise: "Custom"
    }
  })
  .add('technical', {
    api: "https://api.analyticspro.com",
    docs: "https://docs.analyticspro.com",
    status: "https://status.analyticspro.com"
  })
  .add('support', {
    email: "help@analyticspro.com",
    slack: "analyticspro.slack.com",
    hours: "24/7 for enterprise"
  })
  .build();

export default function SaaS() {
  return (
    <ChatBot 
      apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY!}
      companyName="Analytics Pro"
      knowledge={saasKnowledge}
      theme="dark"
      storage={{ enabled: true }}
      onMessageReceive={(msg) => {
        // Track conversations for analytics
        console.log('User asked:', msg);
      }}
    />
  );
}
📖 API Reference
ChatBot Props
Prop	Type	Default	Description
apiKey	string	Required	Your Gemini API key
companyName	string	Required	Company name displayed in header
welcomeMessage	string	"Welcome! I'm your virtual assistant..."	Initial greeting
position	string	"bottom-right"	Chat position (bottom-right, bottom-left, top-right, top-left)
knowledge	any	{}	Any JSON structure with company information
theme	string	"light"	"light" | "dark" | "custom"
model	string	"gemini-2.0-flash"	Gemini model to use
maxTokens	number	1000	Max response tokens
temperature	number	0.7	Creativity (0-1)
apiEndpoint	string	"/api/chat"	Custom API endpoint
systemPrompt	string	undefined	Custom system prompt
suggestions	string[]	[]	Quick suggestion buttons
autoOpen	boolean	false	Auto-open on load
disableAnimations	boolean	false	Disable animations
storage	object	{ enabled: true }	Storage options (enabled, key, maxMessages)
rateLimit	object	undefined	Rate limiting options (maxRequestsPerMinute, onRateLimit)
locale	string	"en"	Language locale
translations	object	{}	Custom translations
customStyles	object	{}	Custom CSS variables
onMessageSend	function	undefined	Send callback
onMessageReceive	function	undefined	Receive callback
onError	function	undefined	Error callback
onOpen	function	undefined	Open callback
onClose	function	undefined	Close callback
chatHandler Function
typescript
import { chatHandler } from 'nextgen-chatbot';

// Used in API routes
export async function POST(request: Request) {
  return chatHandler(request);
}
KnowledgeBuilder Methods
Method	Description
add(key, value)	Add any key-value pair
addAll(object)	Add multiple items
merge(object)	Merge with existing
build()	Return the knowledge object
🤝 Contributing
Contributions are welcome! Here's how you can help:

Fork the repository

Create a feature branch: git checkout -b feature/AmazingFeature

Commit changes: git commit -m 'Add AmazingFeature'

Push: git push origin feature/AmazingFeature

Open a Pull Request

Development Setup
bash
git clone https://github.com/yourusername/nextgen-chatbot.git
cd nextgen-chatbot
npm install
npm run build
📄 License
MIT License - see LICENSE file for details.

🙏 Support
📧 Email: support@nextgen-chatbot.com

🐛 Issues: GitHub Issues

📚 Docs: Documentation

💬 Discord: Join our Discord

<div align="center"> <sub>Built with ❤️ by Jay Limbachiya</sub> <br/> <sub>© 2025 NextGen Chatbot. All rights reserved.</sub> </div> ```