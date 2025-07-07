# NextGen Chatbot

A powerful, customizable chatbot component for Next.js applications that integrates with Google's Gemini AI. Easily add an intelligent virtual assistant to your website with your own company knowledge and branding.

## Features

- 🤖 **AI-Powered**: Built on Google's Gemini AI for intelligent responses
- 🎨 **Customizable**: Fully customizable UI and branding
- 📚 **Knowledge Base**: Train the chatbot with your company's specific information
- 🔧 **Easy Integration**: Simple setup with minimal configuration
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🎯 **Positioning**: Choose from 4 different corner positions
- 🔒 **Secure**: API keys are handled securely on the client side

## Installation

```bash
npm install nextgen-chatbot
```

## Quick Start

### 1. Basic Setup

```tsx
import { ChatBot } from 'nextgen-chatbot';
import 'nextgen-chatbot/dist/styles/chat.css';

export default function MyPage() {
  return (
    <div>
      <h1>Welcome to my website</h1>
      <ChatBot 
        apiKey="your-gemini-api-key"
        companyName="My Company"
      />
    </div>
  );
}
```

### 2. Create API Route ⚠️ **IMPORTANT**

**You must create this API route file for the chatbot to work!**

Create a file at `app/api/chat/route.ts` (or `pages/api/chat.ts` for Pages Router):

```tsx
import { chatHandler } from 'nextgen-chatbot';

export async function POST(request: Request) {
  return chatHandler(request);
}
```

**For Pages Router** (`pages/api/chat.ts`):
```tsx
import { chatHandler } from 'nextgen-chatbot';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const response = await chatHandler(req as any);
    const data = await response.json();
    res.status(response.status).json(data);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

**If you get "Unexpected token '<'" errors, it means this API route is missing!** See [API_SETUP.md](./API_SETUP.md) for detailed instructions.

### 3. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Use this key in your ChatBot component

## Advanced Usage

### Custom Company Knowledge

```tsx
import { ChatBot, createCompanyKnowledge } from 'nextgen-chatbot';

const myCompanyKnowledge = createCompanyKnowledge(
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

export default function MyPage() {
  return (
    <ChatBot 
      apiKey="your-gemini-api-key"
      companyName="TechCorp"
      knowledge={myCompanyKnowledge}
      welcomeMessage="Hello! I'm TechCorp's AI assistant. How can I help you today?"
    />
  );
}
```

### Using Knowledge Templates

```tsx
import { ChatBot, knowledgeTemplates } from 'nextgen-chatbot';

// Use e-commerce template
const ecommerceKnowledge = knowledgeTemplates.ecommerce("MyStore");

// Use service business template
const serviceKnowledge = knowledgeTemplates.service("MyService", "We provide professional consulting services");

export default function MyPage() {
  return (
    <ChatBot 
      apiKey="your-gemini-api-key"
      companyName="MyStore"
      knowledge={ecommerceKnowledge}
    />
  );
}
```

### Using KnowledgeBuilder

```tsx
import { ChatBot, KnowledgeBuilder } from 'nextgen-chatbot';

const knowledge = new KnowledgeBuilder()
  .setCompany({
    name: "My Company",
    description: "We provide amazing services",
    founded: "2024",
    location: "New York",
    industry: "Services"
  })
  .addProducts([
    {
      name: "Premium Service",
      description: "Our flagship service offering",
      features: ["Feature 1", "Feature 2"],
      benefits: ["Benefit 1", "Benefit 2"]
    }
  ])
  .addFAQ([
    {
      question: "How do I get started?",
      answer: "Contact us for a free consultation!"
    }
  ])
  .build();

export default function MyPage() {
  return (
    <ChatBot 
      apiKey="your-gemini-api-key"
      companyName="My Company"
      knowledge={knowledge}
    />
  );
}
```

## Configuration Options

### ChatBot Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiKey` | `string` | **Required** | Your Gemini API key |
| `companyName` | `string` | **Required** | Your company name |
| `welcomeMessage` | `string` | `"Welcome! I'm your virtual assistant..."` | Initial greeting message |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Chat widget position |
| `knowledge` | `CompanyKnowledge` | Default demo data | Your company's knowledge base |
| `apiEndpoint` | `string` | `'/api/chat'` | Custom API endpoint |
| `model` | `string` | `'gemini-2.0-flash'` | Gemini model to use |
| `maxTokens` | `number` | `1000` | Maximum response length |
| `temperature` | `number` | `0.7` | Response creativity (0-1) |

### Company Knowledge Structure

```tsx
interface CompanyKnowledge {
  company: {
    name: string;
    description: string;
    founded: string;
    location: string;
    industry: string;
  };
  products: Array<{
    name: string;
    description: string;
    features?: string[];
    benefits?: string[];
    // ... more fields
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  policies: {
    refund: string;
    privacy: string;
    terms: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    support: {
      email: string;
      phone: string;
    };
  };
}
```

## Styling

The chatbot comes with built-in CSS that you need to import. You can import the styles in several ways:

### Method 1: Import CSS directly in your component
```tsx
import { ChatBot } from 'nextgen-chatbot';
import 'nextgen-chatbot/dist/styles/chat.css';

export default function MyPage() {
  return (
    <ChatBot apiKey="your-key" companyName="My Company" />
  );
}
```

### Method 2: Import CSS in your main layout (Recommended)
```tsx
// In _app.tsx (Pages Router) or layout.tsx (App Router)
import 'nextgen-chatbot/dist/styles/chat.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Method 3: Import CSS in your global styles
```css
/* In your global CSS file */
@import 'nextgen-chatbot/dist/styles/chat.css';
```

### Customizing Styles

You can override the default styles by adding your own CSS:

```css
/* Custom styles */
.chat-button {
  background-color: #your-brand-color !important;
}

.chat-window {
  border-radius: 12px !important;
}

.chat-header {
  background: linear-gradient(45deg, #your-color-1, #your-color-2) !important;
}
```

## Environment Variables

For production, consider using environment variables for your API key:

```tsx
<ChatBot 
  apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY}
  companyName="My Company"
/>
```

## Examples

### E-commerce Store
```tsx
import { ChatBot, knowledgeTemplates } from 'nextgen-chatbot';

const storeKnowledge = knowledgeTemplates.ecommerce("MyStore");

<ChatBot 
  apiKey="your-key"
  companyName="MyStore"
  knowledge={storeKnowledge}
  position="bottom-right"
/>
```

### Service Business
```tsx
import { ChatBot, knowledgeTemplates } from 'nextgen-chatbot';

const serviceKnowledge = knowledgeTemplates.service(
  "MyConsulting", 
  "We provide business consulting and strategy services"
);

<ChatBot 
  apiKey="your-key"
  companyName="MyConsulting"
  knowledge={serviceKnowledge}
  welcomeMessage="Hi! I'm here to help with your business needs."
/>
```

### Custom Knowledge
```tsx
import { ChatBot, createCompanyKnowledge } from 'nextgen-chatbot';

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

<ChatBot 
  apiKey="your-key"
  companyName="My Startup"
  knowledge={customKnowledge}
/>
```

## Customizing the Chatbot UI

The chatbot uses CSS variables for all key colors, fonts, and spacing. You can easily override these in your own CSS to match your brand.

### Example: Change Primary Color and Font

```css
:root {
  --chatbot-primary: #0d9488; /* teal */
  --chatbot-accent: #0ea5e9;  /* sky blue */
  --chatbot-font: 'Roboto', Arial, sans-serif;
}
```

Add this to your global CSS file or inside a selector that wraps your app.

### All Available CSS Variables

```css
:root {
  --chatbot-primary: #2563eb;
  --chatbot-primary-dark: #1d4ed8;
  --chatbot-accent: #4f46e5;
  --chatbot-bg: #fff;
  --chatbot-bg-alt: #f9fafb;
  --chatbot-border: #e5e7eb;
  --chatbot-user-bg: linear-gradient(to right, var(--chatbot-accent), var(--chatbot-primary));
  --chatbot-assistant-bg: #fff;
  --chatbot-assistant-border: #e5e7eb;
  --chatbot-unread-bg: #ef4444;
  --chatbot-unread-color: #fff;
  --chatbot-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  --chatbot-radius: 1rem;
  --chatbot-radius-full: 9999px;
  --chatbot-font: 'Inter', 'Segoe UI', Arial, sans-serif;
  --chatbot-font-size: 1rem;
  --chatbot-message-font-size: 0.95rem;
  --chatbot-header-font-size: 1.1rem;
  --chatbot-input-bg: #f9fafb;
  --chatbot-input-color: #1f2937;
  --chatbot-placeholder: #6b7280;
  --chatbot-send-bg: var(--chatbot-primary);
  --chatbot-send-bg-hover: var(--chatbot-primary-dark);
  --chatbot-send-color: #fff;
  --chatbot-close-hover: #bfdbfe;
}
```

You can override any of these to match your brand or design system.

## Troubleshooting

### Common Issues

1. **"Unexpected token '<'" Error**: This means your API route is missing. Create the API route file as shown in step 2 above. See [API_SETUP.md](./API_SETUP.md) for detailed instructions.

2. **API Key Error**: Make sure your Gemini API key is valid and has proper permissions

3. **CORS Issues**: Ensure your API route is properly configured

4. **Styling Issues**: Check if the CSS is being imported correctly

5. **Knowledge Not Working**: Verify your knowledge object structure matches the interface

### Quick Fix for "Unexpected token '<'" Error

If you're getting this error, it means the API route is missing. Here's the quick fix:

**For App Router** - Create `app/api/chat/route.ts`:
```tsx
import { chatHandler } from 'nextgen-chatbot';
export async function POST(request: Request) {
  return chatHandler(request);
}
```

**For Pages Router** - Create `pages/api/chat.ts`:
```tsx
import { chatHandler } from 'nextgen-chatbot';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const response = await chatHandler(req as any);
    const data = await response.json();
    res.status(response.status).json(data);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

After creating the file, restart your development server.

### Debug Mode

Enable console logging to debug issues:

```tsx
<ChatBot 
  apiKey="your-key"
  companyName="My Company"
  // Add console.log in your API route for debugging
/>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Support

If you need help or have questions, please open an issue on GitHub. 