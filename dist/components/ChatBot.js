'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatBot;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function ChatBot({ apiKey, companyName, welcomeMessage = "Welcome! I'm your virtual assistant. How can I help you today?", position = 'bottom-right', knowledge, apiEndpoint = '/api/chat', model = 'gemini-2.0-flash', maxTokens = 1000, temperature = 0.7 }) {
    const [messages, setMessages] = (0, react_1.useState)([
        {
            role: 'assistant',
            content: welcomeMessage,
        },
    ]);
    const [input, setInput] = (0, react_1.useState)('');
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [unreadCount, setUnreadCount] = (0, react_1.useState)(0);
    const [lastReadIndex, setLastReadIndex] = (0, react_1.useState)(-1);
    const messagesEndRef = (0, react_1.useRef)(null);
    const chatRef = (0, react_1.useRef)(null);
    // Handle click outside
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (isOpen && chatRef.current && !chatRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    // Update unread count when messages change
    (0, react_1.useEffect)(() => {
        if (!isOpen && messages.length > lastReadIndex + 1) {
            setUnreadCount(messages.length - (lastReadIndex + 1));
        }
    }, [messages, isOpen, lastReadIndex]);
    // Reset unread count when chat is opened
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            setUnreadCount(0);
            setLastReadIndex(messages.length - 1);
        }
    }, [isOpen, messages.length]);
    (0, react_1.useEffect)(() => {
        scrollToBottom();
    }, [messages]);
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!input.trim() || isLoading)
            return;
        const userMessage = {
            role: 'user',
            content: input.trim(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        try {
            const messagesToSend = messages.length === 1 ? [userMessage] : messages.concat(userMessage);
            const response = yield fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: messagesToSend,
                    apiKey,
                    knowledge,
                    model,
                    maxTokens,
                    temperature
                }),
            });
            const data = yield response.json();
            if (response.ok) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: data.response },
                ]);
            }
            else {
                throw new Error(data.error || 'Failed to get response');
            }
        }
        catch (error) {
            console.error('Error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'I apologize, but I encountered an error. Please try again.',
                },
            ]);
        }
        finally {
            setIsLoading(false);
        }
    });
    // Helper for chat window position
    const getWindowPositionClass = () => {
        switch (position) {
            case 'bottom-left':
                return 'chatbot-bottom-left';
            case 'top-right':
                return 'chatbot-top-right';
            case 'top-left':
                return 'chatbot-top-left';
            default:
                return 'chatbot-bottom-right';
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!isOpen && ((0, jsx_runtime_1.jsxs)("button", { onClick: () => setIsOpen(true), className: `chat-button chatbot-fab ${getWindowPositionClass()}`, "aria-label": "Open chat", children: [(0, jsx_runtime_1.jsx)("span", { className: "chatbot-fab-icon", "aria-hidden": "true", children: (0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-7 h-7", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "11", fill: "currentColor", opacity: "0.08" }), (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z", fill: "none" })] }) }), unreadCount > 0 && ((0, jsx_runtime_1.jsx)("span", { className: "unread-badge", children: unreadCount }))] })), isOpen && ((0, jsx_runtime_1.jsx)("div", { ref: chatRef, className: `chat-window open ${getWindowPositionClass()}`, role: "dialog", "aria-modal": "true", children: (0, jsx_runtime_1.jsxs)("div", { className: "chat-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "chat-header", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold", children: companyName }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-blue-100", children: "Virtual Assistant" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setIsOpen(false), className: "close-button", "aria-label": "Close chat", children: (0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 20 20", fill: "currentColor", children: [(0, jsx_runtime_1.jsx)("title", { children: "Close" }), (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "chat-messages", children: [messages.map((message, index) => ((0, jsx_runtime_1.jsx)("div", { className: `message-container ${message.role === 'user' ? 'user' : 'assistant'}`, children: (0, jsx_runtime_1.jsx)("div", { className: `message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`, children: (0, jsx_runtime_1.jsx)("p", { className: "message-text", children: message.content }) }) }, index))), isLoading && ((0, jsx_runtime_1.jsx)("div", { className: "message-container assistant", children: (0, jsx_runtime_1.jsxs)("div", { className: "loading-indicator", children: [(0, jsx_runtime_1.jsx)("div", { className: "dot" }), (0, jsx_runtime_1.jsx)("div", { className: "dot" }), (0, jsx_runtime_1.jsx)("div", { className: "dot" })] }) })), (0, jsx_runtime_1.jsx)("div", { ref: messagesEndRef })] }), (0, jsx_runtime_1.jsx)("div", { className: "chat-input-container", children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "chat-form", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), placeholder: "Type your message...", className: "chat-input", disabled: isLoading }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: isLoading, className: "send-button", "aria-label": "Send message", children: "Send" })] }) })] }) }))] }));
}
