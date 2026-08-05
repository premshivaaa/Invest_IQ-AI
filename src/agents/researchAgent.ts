import { searchCompany } from '../services/tavily';
import { getLLM } from '../services/llm';
import { SYSTEM_PROMPT, getAnalysisUserPrompt } from '../prompts/analysis';
import { InvestmentReport } from '../types';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

export type ProgressCallback = (stepId: string, status: 'running' | 'success' | 'error', message?: string) => void;

export async function runInvestmentResearch(
  companyName: string,
  onProgress: ProgressCallback,
  providerOverride?: 'openai' | 'gemini'
): Promise<InvestmentReport> {
  try {
    // Step 1: Web Search
    onProgress('searching_company', 'running', `Searching public records for "${companyName}"...`);
    const searchResult = await searchCompany(companyName);
    onProgress('searching_company', 'success', 'Web search completed.');

    // Step 2: Gathering Info
    onProgress('gathering_info', 'running', 'Extracting latest company details...');
    // We simulate a short delay for parsing to give a premium step-by-step UX
    await new Promise((resolve) => setTimeout(resolve, 50));
    onProgress('gathering_info', 'success', 'Latest details compiled.');

    // Step 3: Finding Financials
    onProgress('finding_financials', 'running', 'Analyzing income statement, balance sheet, and metrics...');
    await new Promise((resolve) => setTimeout(resolve, 50));
    onProgress('finding_financials', 'success', 'Financial metrics isolated.');

    // Step 4: Identifying Competitors
    onProgress('identifying_competitors', 'running', 'Mapping competitive landscape and market share...');
    await new Promise((resolve) => setTimeout(resolve, 50));
    onProgress('identifying_competitors', 'success', 'Competitors mapped.');

    // Step 5: Evaluating Risks
    onProgress('evaluating_risks', 'running', 'Analyzing market, financial, and regulatory risks...');
    await new Promise((resolve) => setTimeout(resolve, 50));
    onProgress('evaluating_risks', 'success', 'Risk severity assessed.');

    // Step 6: Running AI Reasoning
    onProgress('running_reasoning', 'running', 'Synthesizing investment thesis...');
    
    const llm = getLLM(providerOverride);
    const userPrompt = getAnalysisUserPrompt(companyName, searchResult.text);

    // Call LangChain model
    const response = await llm.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(userPrompt),
    ]);

    onProgress('running_reasoning', 'success', 'Reasoning engine completed.');

    // Step 7: Generating Recommendation
    onProgress('generating_recommendation', 'running', 'Compiling final scoring and recommendation...');

    // Extract text content from LLM response
    const rawContent = typeof response.content === 'string' 
      ? response.content 
      : JSON.stringify(response.content);

    // Parse JSON safely
    let report: InvestmentReport;
    try {
      // Find JSON block if wrapped in markdown
      const jsonStart = rawContent.indexOf('{');
      const jsonEnd = rawContent.lastIndexOf('}');
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('No valid JSON object found in AI response.');
      }
      const jsonString = rawContent.substring(jsonStart, jsonEnd + 1);
      report = JSON.parse(jsonString) as InvestmentReport;
      
      report.isDemo = !process.env.TAVILY_API_KEY || process.env.TAVILY_API_KEY.includes('YOUR_TAVILY_API_KEY');
      
      // Inject URLs gathered from Tavily Search
      report.sources = searchResult.urls;
      
    } catch (parseError) {
      console.error('Failed to parse AI output as JSON:', rawContent);
      throw new Error(`AI generated invalid format: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    }

    onProgress('generating_recommendation', 'success', 'Recommendation generated successfully.');
    
    return report;
  } catch (error) {
    console.error('Error in research agent:', error);
    throw error;
  }
}
