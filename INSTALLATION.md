# Quick Installation Guide

## 1. Install the Package

```bash
npm install nextgen-chatbot
```

## 2. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key for use in your application

## 3. Create API Route

### For Next.js App Router (app directory)

Create `app/api/chat/route.ts`:

```tsx
import { chatHandler } from 'nextgen-chatbot';

export async function POST(request: Request) {
  return chatHandler(request);
}
```

### For Next.js Pages Router (pages directory)

Create `pages/api/chat.ts`:

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

## 4. Add ChatBot to Your Page

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

## 5. Environment Variables (Recommended)

For production, use environment variables:

```env
# .env.local
NEXT_PUBLIC_GEMINI_API_KEY=your-actual-api-key
```

Then in your component:

```tsx
<ChatBot 
  apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY!}
  companyName="My Company"
/>
```

## That's it! 🎉

Your chatbot is now ready to use. Users can click the chat button and start conversations with your AI assistant.

## Next Steps

- [Customize your company knowledge](./README.md#custom-company-knowledge)
- [Use knowledge templates](./README.md#using-knowledge-templates)
- [Customize the appearance](./README.md#styling)
- [Configure advanced options](./README.md#configuration-options) 