import { ChatOpenAI } from '@langchain/openai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';

export type LLMProvider = 'openai' | 'gemini';

export function getLLM(providerOverride?: LLMProvider): BaseChatModel {
  const provider = (providerOverride || process.env.LLM_PROVIDER || 'gemini').toLowerCase() as LLMProvider;

  if (provider === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required when LLM_PROVIDER is set to "openai".');
    }
    
    // Using GPT-4o for complex financial analysis
    return new ChatOpenAI({
      apiKey,
      modelName: 'gpt-4o',
      temperature: 0.1,
      modelKwargs: {
        response_format: { type: 'json_object' },
      },
    });
  } else if (provider === 'gemini') {
    // Check for standard Gemini keys
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY or GOOGLE_API_KEY environment variable is required when LLM_PROVIDER is set to "gemini".');
    }

    // Using Gemini 2.5 Flash (for better free-tier quota limits)
    return new ChatGoogleGenerativeAI({
      apiKey,
      model: 'gemini-2.5-flash',
      temperature: 0.1,
      json: true,
    });
  } else {
    throw new Error(`Unsupported LLM_PROVIDER "${provider}". Supported values are "openai" or "gemini".`);
  }
}
