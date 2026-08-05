export interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  raw_content?: string;
  score: number;
}

export interface TavilySearchResponse {
  results: TavilySearchResult[];
  answer?: string;
}

function getMockSearchData(companyName: string): { text: string; urls: string[] } {
  const normalized = companyName.toLowerCase();
  
  const mockWebsites: Record<string, string> = {
    tesla: 'tesla.com',
    apple: 'apple.com',
    nvidia: 'nvidia.com',
    microsoft: 'microsoft.com',
    swiggy: 'swiggy.in',
    zomato: 'zomato.com',
    reliance: 'ril.com',
    infosys: 'infosys.com',
    openai: 'openai.com',
  };
  
  const domain = mockWebsites[normalized] || `${normalized.replace(/\s+/g, '')}.com`;
  
  const text = `
--- Source 1: ${companyName} Corporate Profile and Recent Milestones (https://www.${domain}) ---
${companyName} is a premier global enterprise operating within technology and consumer services. Headquartered in a major innovation hub, the company maintains a workforce of over 100,000 employees globally. Managed by a veteran team under the current Chief Executive Officer, the organization continues to innovate across products, software applications, and subscription platforms. Recent press releases highlight expanded customer counts and double-digit year-over-year active user growth.

--- Source 2: Consolidated Financial Results & Earnings 2025/2026 (https://finance.yahoo.com/q?s=${normalized}) ---
For the latest fiscal period, ${companyName} reported total annual revenues of $85.4 Billion, representing a strong 18.5% year-over-year growth rate. Net income climbed to $12.5 Billion, with a healthy operating margin of 15.2%. The stock's trailing P/E ratio is positioned at 34.5 with a reported EPS of $3.80. The company maintains an excellent balance sheet, reporting $18.5 Billion in cash and cash equivalents against a total debt of $4.2 Billion, indicating low leverage and comfortable liquidity ratios.
Annual revenue trend:
- 2022: $48.2 Billion
- 2023: $62.4 Billion
- 2024: $74.8 Billion
- 2025: $85.4 Billion

--- Source 3: Competitive Analysis and SWOT Insights (https://www.bloomberg.com/news/articles/${normalized}) ---
${companyName} competes with leading international players. Market position is strong, classified in the top 3 with a stable market share of 28%. Key advantages include vertical integration, high pricing power, and superior brand recall. Disadvantages include steep marketing and user acquisition costs. SWOT summaries highlight strengths in cash flow, weaknesses in supply chain density, opportunities in emerging markets, and threats in changing interest rates.

--- Source 4: Industry Headwinds and Regulatory Risks (https://www.reuters.com/business/${normalized}) ---
Market reports show key challenges for ${companyName} heading into late 2026. These include stricter regulatory standards in key international markets, supply chain adjustments, and strong discount-pricing from low-cost competitors. Potential catalysts include launching updated AI-driven automation services and regional operational expansions.
`;

  return {
    text: text.trim(),
    urls: [
      `https://www.${domain}`,
      `https://finance.yahoo.com/q?s=${normalized}`,
      `https://www.bloomberg.com/news/articles/${normalized}`,
      `https://www.reuters.com/business/${normalized}`,
    ]
  };
}

export async function searchCompany(companyName: string): Promise<{ text: string; urls: string[] }> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('YOUR_TAVILY_API_KEY')) {
    console.warn(`Running in Demo Mode: TAVILY_API_KEY is not configured. Using generated web data for ${companyName}`);
    return getMockSearchData(companyName);
  }

  // We search for general info, business model, financials, and recent news.
  const query = `${companyName} company business model products financial snapshot revenue competitors recent news 2025 2026`;
  
  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: 'advanced',
        include_answer: true,
        max_results: 8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Tavily API error: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as TavilySearchResponse;
    const results = data.results || [];
    
    // Concatenate contents to feed the LLM
    let text = `Tavily AI Answer Summary: ${data.answer || 'N/A'}\n\n`;
    const urls: string[] = [];

    results.forEach((res, index) => {
      text += `--- Source ${index + 1}: ${res.title} (${res.url}) ---\n`;
      text += `${res.content}\n\n`;
      if (res.url && !urls.includes(res.url)) {
        urls.push(res.url);
      }
    });

    return { text, urls };
  } catch (error) {
    console.error('Error querying Tavily:', error);
    throw error;
  }
}
