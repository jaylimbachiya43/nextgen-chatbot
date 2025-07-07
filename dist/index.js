"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knowledgeTemplates = exports.createCompanyKnowledge = exports.KnowledgeBuilder = exports.companyKnowledge = exports.chatHandler = exports.ChatBot = void 0;
// Main exports
var ChatBot_1 = require("./components/ChatBot");
Object.defineProperty(exports, "ChatBot", { enumerable: true, get: function () { return __importDefault(ChatBot_1).default; } });
var route_1 = require("./api/route");
Object.defineProperty(exports, "chatHandler", { enumerable: true, get: function () { return route_1.chatHandler; } });
// Types
__exportStar(require("./types/chat"), exports);
// Default knowledge data
var company_knowledge_1 = require("./data/company-knowledge");
Object.defineProperty(exports, "companyKnowledge", { enumerable: true, get: function () { return company_knowledge_1.companyKnowledge; } });
// Knowledge building utilities
var knowledge_builder_1 = require("./utils/knowledge-builder");
Object.defineProperty(exports, "KnowledgeBuilder", { enumerable: true, get: function () { return knowledge_builder_1.KnowledgeBuilder; } });
Object.defineProperty(exports, "createCompanyKnowledge", { enumerable: true, get: function () { return knowledge_builder_1.createCompanyKnowledge; } });
Object.defineProperty(exports, "knowledgeTemplates", { enumerable: true, get: function () { return knowledge_builder_1.knowledgeTemplates; } });
