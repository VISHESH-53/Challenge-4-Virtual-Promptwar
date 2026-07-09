export enum AiModel {
  GPT4 = 'GPT4',
  CLAUDE = 'CLAUDE',
  GEMINI = 'GEMINI',
}

export enum AiProvider {
  OPENAI = 'OPENAI',
  ANTHROPIC = 'ANTHROPIC',
  GOOGLE = 'GOOGLE',
}

export interface AiMessage {
  id: string;
  conversationId: string;
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AiConversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: AiMessage[];
}

export interface EmbeddingVector {
  id: string;
  documentId: string;
  vector: number[];
  text: string;
  metadata: Record<string, any>;
}

export interface RagDocument {
  id: string;
  title: string;
  content: string;
  sourceUrl?: string;
  createdAt: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  template: string;
  variables: string[];
  description?: string;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AiResponse {
  message: AiMessage;
  usage: TokenUsage;
}

export interface StreamChunk {
  id: string;
  content: string;
  isFinished: boolean;
}
