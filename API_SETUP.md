# API Route Setup Guide

The error "Unexpected token '<', "<!DOCTYPE "..." means your API route is not set up correctly. This guide will help you fix this.

## The Problem

When you see this error, it means the chatbot is trying to call `/api/chat` but getting an HTML page (like a 404 error page) instead of JSON. This happens when the API route file is missing or incorrectly configured.

## Solution: Create the API Route

### For Next.js App Router (app directory)

Create a file at `app/api/chat/route.ts`:

```tsx
import { chatHandler } from 'nextgen-chatbot';

export async function POST(request: Request) {
  return chatHandler(request);
}
```

### For Next.js Pages Router (pages directory)

Create a file at `pages/api/chat.ts`:

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

## Step-by-Step Instructions

### 1. Check Your Project Structure

First, determine if you're using App Router or Pages Router:

- **App Router**: You have an `app` folder in your project root
- **Pages Router**: You have a `pages` folder in your project root

### 2. Create the API Route File

#### For App Router:
```bash
# Create the directory structure
mkdir -p app/api/chat

# Create the route file
touch app/api/chat/route.ts
```

Then add this content to `app/api/chat/route.ts`:
```tsx
import { chatHandler } from 'nextgen-chatbot';

export async function POST(request: Request) {
  return chatHandler(request);
}
```

#### For Pages Router:
```bash
# Create the API file
touch pages/api/chat.ts
```

Then add this content to `pages/api/chat.ts`:
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


## 3. Updated API_SETUP.md

```markdown
# API Route Setup Guide

The error **"Unexpected token '<', "<!DOCTYPE..."** means your API route is not set up correctly. This guide will help you fix this.

## The Problem

When you see this error, it means the chatbot is trying to call `/api/chat` but getting an HTML page (like a 404 error page) instead of JSON. This happens when the API route file is missing or incorrectly configured.

## Solution: Create the API Route

### For Next.js App Router (app directory)

Create a file at `app/api/chat/route.ts`:

```typescript
import { chatHandler } from 'nextgen-chatbot';

export async function POST(request: Request) {
  return chatHandler(request);
}

### 4. Restart Your Development Server

After creating the API route, restart your Next.js development server:

```bash
npm run dev
# or
yarn dev
```

## Common Issues and Solutions

### Issue 1: Still getting HTML instead of JSON
**Solution**: Make sure you created the API route file in the correct location and restarted your dev server.

### Issue 2: "Module not found" error
**Solution**: Make sure you installed the package correctly:
```bash
npm install nextgen-chatbot
```

### Issue 3: API route exists but still not working
**Solution**: Check your file structure:
```
your-project/
├── app/                    # App Router
│   └── api/
│       └── chat/
│           └── route.ts    # This file must exist
└── pages/                  # Pages Router
    └── api/
        └── chat.ts         # This file must exist
```

### Issue 4: CORS errors
**Solution**: This shouldn't happen with Next.js API routes, but if it does, make sure you're calling the API from the same domain.

## Complete Working Example

Here's a complete working example:

### 1. Install the package
```bash
npm install nextgen-chatbot
```

### 2. Create the API route
**For App Router** (`app/api/chat/route.ts`):
```tsx
import { chatHandler } from 'nextgen-chatbot';

export async function POST(request: Request) {
  return chatHandler(request);
}
```

### 3. Add the chatbot to your page
```tsx
import { ChatBot } from 'nextgen-chatbot';
import 'nextgen-chatbot/dist/styles/chat.css';

export default function MyPage() {
  return (
    <div>
      <h1>My Website</h1>
      <ChatBot 
        apiKey="your-gemini-api-key"
        companyName="My Company"
      />
    </div>
  );
}
```

### 4. Test it
1. Start your development server: `npm run dev`
2. Visit your page
3. Click the chat button
4. Type "hi" and press send

You should now get a proper response instead of the HTML error!

## Still Having Issues?

If you're still getting the error after following these steps:

1. **Check the browser console** for more detailed error messages
2. **Check the terminal** where you're running `npm run dev` for any errors
3. **Verify your API key** is correct and has proper permissions
4. **Make sure you're using the latest version** of the package

Let me know if you need any clarification or if you're still experiencing issues! 